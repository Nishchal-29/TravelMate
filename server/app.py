from fastapi import FastAPI, Query
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from dotenv import load_dotenv
from amadeus import Client, ResponseError
import os
import requests
from bs4 import BeautifulSoup

# Load environment variables from .env
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Setup Amadeus client
amadeus = Client(
    client_id=os.getenv("AMADEUS_API_KEY"),
    client_secret=os.getenv("AMADEUS_API_SECRET")
)

# Setup FastAPI
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# LangChain LLM setup
llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash",
    temperature=0.7,
    google_api_key=GOOGLE_API_KEY
)

prompt = PromptTemplate(
    input_variables=["history", "input"],
    template="""
You are a helpful AI Travel Agent. Only answer travel-related questions like:
- booking flights or trains
- suggesting hotels
- creating itineraries
- describing tourist destinations

If asked something unrelated, respond:
"I'm only able to assist with travel-related queries."

If a tourist place or destination is mentioned, also include a **relevant image link** (e.g., from Google Images or Wikipedia) as:
Image: https://...

Conversation so far:
{history}

User: {input}
TravelBot:"""
)

session_memories = {}

# ==== MODELS ====

class ChatRequest(BaseModel):
    message: str
    session_id: str

class FlightRequest(BaseModel):
    origin: str
    destination: str
    date: str  # format: YYYY-MM-DD

# ==== UTILITY: GET IATA CODE ====

def get_iata_code(city_name: str):
    try:
        response = amadeus.reference_data.locations.get(
            keyword=city_name,
            subType="CITY"
        )
        return response.data[0]["iataCode"]
    except Exception as e:
        print(f"[IATA ERROR] Failed to get IATA code for {city_name}: {e}")
        return None

# ==== CHAT ROUTE ====

@app.post("/chat")
def chat(req: ChatRequest):
    if req.session_id not in session_memories:
        session_memories[req.session_id] = ConversationBufferMemory(
            memory_key="history", input_key="input", return_messages=False
        )

    memory = session_memories[req.session_id]
    chain = ConversationChain(llm=llm, prompt=prompt, memory=memory)
    response = chain.run(req.message)
    history = memory.buffer.strip().split("\n")[-10:]
    return {"response": response, "history": history}

# ==== FLIGHT ROUTE ====

@app.get("/flights")
async def get_flights(
    from_: str = Query(..., alias="from"),
    to: str = Query(...),
    date: str = Query(...)
):
    origin = get_iata_code(from_)
    destination = get_iata_code(to)

    if not origin or not destination:
        return {
            "error": f"Could not determine IATA code(s). Origin: {origin}, Destination: {destination}"
        }

    try:
        print(f"Fetching flights from {origin} to {destination} on {date}")

        response = amadeus.shopping.flight_offers_search.get(
            originLocationCode=origin,
            destinationLocationCode=destination,
            departureDate=date,
            adults=1,
            max=100
        )

        results = []
        for offer in response.data:
            itinerary = offer["itineraries"][0]["segments"][0]
            flight_info = {
                "airline": itinerary["carrierCode"],
                "flight_number": f"{itinerary['carrierCode']} {itinerary['number']}",
                "departure_airport": itinerary["departure"]["iataCode"],
                "departure_time": itinerary["departure"]["at"],
                "arrival_airport": itinerary["arrival"]["iataCode"],
                "arrival_time": itinerary["arrival"]["at"],
                "duration": itinerary["duration"],
                "stops": itinerary["numberOfStops"],
                "price": offer["price"]["grandTotal"],
                "currency": offer["price"]["currency"]
            }
            results.append(flight_info)

        return {"flights": results}

    except ResponseError as e:
        print(f"[Amadeus API ERROR] {e}")
        return {"error": str(e)}

@app.get("/trains")
async def get_trains(
    from_: str = Query(..., alias="from"),
    to: str = Query(...),
    date: str = Query(...)
):
    url = f"https://www.goibibo.com/trains/results/?utm_campaign=SEO&utm_source=IRTS&source={from_}&destination={to}&date={date}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
    }
    res = requests.get(url, headers=headers)
    soup = BeautifulSoup(res.content, "html.parser")

    results = []
    trains = soup.select("div.TrainCard__TrainCardContainer-sc-1m4dpwl-0")
    for train in trains:
        name = train.select_one(".TrainCard__TrainName-sc-1m4dpwl-5").text.strip() if train.select_one(".TrainCard__TrainName-sc-1m4dpwl-5") else ""
        dep = train.select_one(".TrainCard__TimeText-sc-1m4dpwl-10").text.strip() if train.select_one(".TrainCard__TimeText-sc-1m4dpwl-10") else ""
        arr = train.select(".TrainCard__TimeText-sc-1m4dpwl-10")
        arr_time = arr[1].text.strip() if len(arr) > 1 else ""
        duration = train.select_one(".TrainCard__DurationText-sc-1m4dpwl-12").text.strip() if train.select_one(".TrainCard__DurationText-sc-1m4dpwl-12") else ""

        fare_elem = train.select_one(".TrainCard__FareText-sc-1m4dpwl-14")
        fare = fare_elem.text.strip() if fare_elem else ""

        results.append({
            "train": name,
            "departure": dep,
            "arrival": arr_time,
            "duration": duration,
            "fare": fare
        })
        print(results)
    return {"trains": results}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8080, reload=True)
