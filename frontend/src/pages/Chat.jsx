import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Loader2, Send } from "lucide-react";
import { Modal, Button } from "react-bootstrap";
import stationData from "../assets/railwayStationsList.json";
import Navbar1 from "../components/Navbar";

export default function Chat() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const from = params.get("from");
  const to = params.get("to");
  const date = params.get("date");

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isWaitingForFirstResponse, setIsWaitingForFirstResponse] = useState(false);
  const sessionId = useRef(Date.now().toString());
  const hasIntroBeenSent = useRef(false);

  const [showFlightModal, setShowFlightModal] = useState(false);
  const [flightOptions, setFlightOptions] = useState([]);
  const [flightFetched, setFlightFetched] = useState(false);

  const [showTrainModal, setShowTrainModal] = useState(false);
  const [trainOptions, setTrainOptions] = useState([]);

const cityAliases = {
  bangalore: "Bengaluru",
  bengaluru: "Bangalore",
  delhi: "Delhi",
  newdelhi: "Delhi",
  mumbai: "Mumbai",
  bombay: "Mumbai",
  kolkata: "Kolkata",
  calcutta: "Kolkata",
  chennai: "Chennai",
  madras: "Chennai"
};

// const getStationCode = (cityName) => {
//   const normalizedCity = cityName.trim().toLowerCase();
//   const mappedCity = cityAliases[normalizedCity] || cityName;

//   // Match exact or startsWith instead of includes
//   const station = stationData.find(
//     (stn) => stn.stnCity.toLowerCase() === mappedCity.toLowerCase()
//   );

//   return station ? station.stnCode : null;
// };
  const getStationCode = (city) => {
    const station = stationData.stations.find(
      (s) => s.stnCity.toLowerCase() === city.toLowerCase()
    );
    return station ? station.stnCode : null;
  };


  const flightQueries = [
    "best flight options", "flight options", "show me flights", "find flights",
    "book a flight", "search flights", "cheap flights", "air tickets",
    "flight schedule", "available flights", "air travel", "airline tickets",
    "plane tickets", "flight prices", "flight availability", "next flight to",
    "flights from", "flights to", "flight booking", "flight details", "airfare",
  ];

  const trainQueries = [
    "train options", "train schedule", "available trains", "train between stations",
    "train from", "train to", "book a train", "find trains", "train routes",
  ];

  const isFlightQuery = (msg) => flightQueries.some((q) => msg.toLowerCase().includes(q));
  const isTrainQuery = (msg) => trainQueries.some((q) => msg.toLowerCase().includes(q));

  const fetchTrainData = async (from, to, date) => {
  const fromCode = getStationCode(from);
  const toCode = getStationCode(to);

if (!fromCode || !toCode) {
  console.warn("Station code not found:", { from, to, fromCode, toCode });
  return [];
}

  const response = await fetch(
    `https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations?fromStationCode=${fromCode}&toStationCode=${toCode}&dateOfJourney=${date}`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "irctc1.p.rapidapi.com"
      }
    }
  );

  const data = await response.json();
  return data.data || [];
};

// const fetchTrainData = async (from, to, date) => {
//   try {
//     const response = await fetch(
//       `${import.meta.env.VITE_API_BASE_URL}/trains?from=${from}&to=${to}&date=${date}`
//     );
//     const data = await response.json();
//     return data.trains || [];
//   } catch (error) {
//     console.error("Failed to fetch trains:", error);
//     return [];
//   }
// };

  const handleSend = async (msg) => {
  if (!msg.trim()) return;
  setMessages((prev) => [...prev, { role: "user", text: msg }]);
  setLoading(true);

  try {
    if (isFlightQuery(msg) && from && to && date && !flightFetched) {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/flights?from=${from}&to=${to}&date=${date}`);
      const data = await res.json();

      setFlightOptions(data.flights || []);
      setShowFlightModal(true);
      setFlightFetched(true);
      setMessages((prev) => [...prev, { role: "bot", text: "Here are the best flight options I found for you:" }]);
    } else if (isTrainQuery(msg) && from && to && date) {
      const trains = await fetchTrainData(from, to, date);
      if (trains.length > 0) {
        setTrainOptions(trains);
        setShowTrainModal(true);
        setMessages((prev) => [...prev, { role: "bot", text: "Here are the available train options:" }]);
      } else {
        setMessages((prev) => [...prev, { role: "bot", text: "Sorry, I couldn't find any trains for that route." }]);
      }
    } else {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, session_id: sessionId.current }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.response }]);
    }
  } catch (err) {
    console.error("Chat error:", err);
    setMessages((prev) => [...prev, { role: "bot", text: "⚠️ Sorry, something went wrong!" }]);
  } finally {
    setInput("");
    setLoading(false);
    setIsWaitingForFirstResponse(false);
  }
};

  useEffect(() => {
    if (from && to && date && !hasIntroBeenSent.current) {
      const intro = `I want to travel from ${from} to ${to} on ${date}.`;
      setInput(intro);
      setIsWaitingForFirstResponse(true);
      handleSend(intro);
      hasIntroBeenSent.current = true;
    }
  }, [from, to, date]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || loading || isWaitingForFirstResponse) return;
    handleSend(input);
  };

  return (
    <div
      className="py-4 d-flex flex-column vh-100"
      style={{
        background: "linear-gradient(to bottom right, #f5f7fa, #1d50a3ff)",
      }}
>
     <Navbar1/>
      <div className="text-center mb-3" style={{marginTop:'60px'}}>
        <h2 className="fw-bold text-primary">🧭 AI Travel Agent</h2>
      </div>

      <div
        className="flex-grow-1 overflow-auto mb-3 px-3 py-4"
        style={{
          backgroundColor: "#f5f5f5",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          maxHeight: "75vh",
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`d-flex mb-4 ${msg.role === "user" ? "justify-content-end" : "justify-content-start"}`}
          >
            {msg.role === "bot" && (
              <div
                className="me-2 d-flex align-items-start justify-content-center rounded-circle text-white fw-bold"
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#ccc",
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                <span className="m-auto">TA</span>
              </div>
            )}
            <div
              className={`p-3 rounded-4 shadow-sm ${
                msg.role === "user" ? "bg-primary text-white" : "bg-white text-dark border"
              }`}
              style={{
                maxWidth: "70%",
                borderRadius: "20px",
                fontSize: "15px",
                lineHeight: "1.4",
                whiteSpace: "pre-wrap",
              }}
            >
              <Markdown remarkPlugins={[remarkGfm]}>{msg.text}</Markdown>
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-muted text-center small fst-italic">TravelBot is typing...</div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="input-group">
        <input
          type="text"
          className="form-control rounded-pill px-4"
          placeholder="Ask me about flights, hotels, or travel tips..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading || isWaitingForFirstResponse}
        />
        <button
          className="btn btn-primary rounded-pill ms-2 d-flex align-items-center justify-content-center"
          disabled={loading || isWaitingForFirstResponse}
          type="submit"
          style={{ width: "45px", height: "45px" }}
        >
          {loading ? <Loader2 className="spinner-border spinner-border-sm" /> : <Send size={18} />}
        </button>
      </form>

      <Modal show={showFlightModal} onHide={() => setShowFlightModal(false)} centered dialogClassName="modal-lg">
        <Modal.Header closeButton>
          <Modal.Title>🛫 Available Flights</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {flightOptions.length === 0 ? (
            <div className="text-muted">No flights found for the selected route.</div>
          ) : (
            <div className="container py-3">
              <div className="row">
                {flightOptions.map((flight, index) => (
                  <div className="col-12 mb-4" key={index}>
                    <div className="card border-0 shadow-lg rounded-4">
                      <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h5 className="mb-0 fw-bold text-primary">{flight.airline}</h5>
                          <span className="badge bg-light text-dark border border-secondary">{flight.flight_number}</span>
                        </div>

                        <div className="d-flex justify-content-between">
                          <div>
                            <p className="mb-1 text-muted small">Departure</p>
                            <h6 className="mb-0 fw-semibold">{new Date(flight.departure_time).toLocaleString()}</h6>
                            <p className="text-uppercase text-muted small">{flight.departure_airport}</p>
                          </div>
                          <div className="text-center mx-3">
                            ✈️
                            <p className="text-muted small mt-1">
                            {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop(s)`}
                            </p>  
                            </div>
                          <div>
                            <p className="mb-1 text-muted small">Arrival</p>
                            <h6 className="mb-0 fw-semibold">{new Date(flight.arrival_time).toLocaleString()}</h6>
                            <p className="text-uppercase text-muted small">{flight.arrival_airport}</p>
                          </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-4">
                          <span className="text-muted small">Duration: {flight.duration.replace("PT", "").toLowerCase()}</span>
                          <h5 className="text-success fw-bold mb-0">
                            ₹{flight.price} <span className="text-muted fs-6">{flight.currency}</span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFlightModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showTrainModal} onHide={() => setShowTrainModal(false)} centered dialogClassName="modal-lg">
        <Modal.Header closeButton>
          <Modal.Title>🚆 Available Trains</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {trainOptions.length === 0 ? (
            <div className="text-muted">No trains found for the selected route.</div>
          ) : (
            <div className="container py-3">
              <div className="row">
                {trainOptions.map((train, index) => (
                  <div className="col-12 mb-4" key={index}>
                    <div className="card border-0 shadow-lg rounded-4">
                      <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h5 className="mb-0 fw-bold text-primary">{train.train_name}</h5>
                          <span className="badge bg-light text-dark border border-secondary">{train.train_number}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <div>
                            <p className="mb-1 text-muted small">Departure</p>
                            <h6 className="mb-0 fw-semibold">{train.from_std} ({train.from_station_code})</h6>
                          </div>
                          <div className="text-center mx-3">➡️</div>
                          <div>
                            <p className="mb-1 text-muted small">Arrival</p>
                            <h6 className="mb-0 fw-semibold">{train.to_std} ({train.to_station_code})</h6>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-4">
                          <span className="text-muted small">Travel Time: {train.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTrainModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
