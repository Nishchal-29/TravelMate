import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Details from "./pages/Details";
import AdminDashboard from "./pages/AdminDashboard"
import { WhyUs } from "./pages/whyus";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/whyus" element={<WhyUs />} />
        <Route path="/details" element={<Details />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;