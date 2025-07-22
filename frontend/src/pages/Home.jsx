import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import citiesData from "../assets/indian_cities.json";
import { Footer } from '../components/footer';
import QR from "../assets/TravelMate_QR_.jpg";
import TravelMateLogo from "../assets/TravelMate.svg";
import { Modal, Button, Form } from "react-bootstrap";

const citiesInIndia = citiesData.map((c) => c.name);

const AutocompleteInput = ({ label, value, onChange }) => {
  const [showList, setShowList] = useState(false);

  const filteredCities = citiesInIndia.filter(
    (city) => city.toLowerCase().startsWith(value.toLowerCase()) && value
  );

  const handleSelect = (city) => {
    onChange(city);
    setShowList(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        placeholder={label}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setShowList(true);
        }}
        onFocus={() => setShowList(true)}
        onBlur={() => setTimeout(() => setShowList(false), 100)}
        required
        style={styles.input}
      />
      {showList && filteredCities.length > 0 && (
        <ul style={styles.dropdownList}>
          {filteredCities.map((city, i) => (
            <li
              key={i}
              style={styles.dropdownItem}
              onMouseDown={() => handleSelect(city)}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

function Home() {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleAdminLogin = () => {
    if (adminPassword === "travelmate") {
      navigate("/admin");
      setShowModal(false);
    } else {
      setLoginError("Incorrect password!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!from || !to || !date) return;
    navigate(
      `/chat?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}`
    );
  };

  return (
    <div style={styles.container}>
      {/* Admin Login Button */}
      <div style={styles.adminBtnContainer}>
        <button
          onClick={() => setShowModal(true)}
          style={styles.adminButton}
        >
          Admin Login
        </button>
      </div>

      {/* Admin Login Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Admin Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Admin Name</Form.Label>
              <Form.Control
                type="text"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                placeholder="Enter admin name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter password"
              />
            </Form.Group>

            {loginError && <p style={{ color: "red" }}>{loginError}</p>}

            <Button variant="primary" onClick={handleAdminLogin}>
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Hero Section */}
      <div style={styles.travelMateSection}>
        <img src={TravelMateLogo} alt="TravelMate Logo" width="60" style={{ marginBottom: "10px" }} />
        <h2 style={styles.brandName}>TravelMate</h2>
        <p style={styles.tagline}>Your Smart AI Travel Bot</p>
      </div>

      <h1 style={styles.heading}>Plan Your Dream Trip ✈️</h1>
      <p style={styles.subtext}>
        Choose any city in India and let our AI bot help you plan a magical journey.
      </p>

      <form onSubmit={handleSubmit} style={{ ...styles.card, marginBottom: '40px' }}>
        <AutocompleteInput label="From (City)" value={from} onChange={setFrom} />
        <AutocompleteInput label="To (City)" value={to} onChange={setTo} />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Plan This Trip 🧭
        </button>
      </form>

      <div style={styles.qrContainer}>
        <h3 style={styles.qrHeading}>Chat with our Travel Bot on WhatsApp</h3>
        <p style={{ color: "#4b5563" }}>Scan the QR code on your mobile device</p>
        <img src={QR} alt="TravelMate WhatsApp QR" style={styles.qrImage} />
      </div>

      <div className="w-screen">
        <Footer />
      </div>
    </div>
  );
}

export default Home;

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, #bfdbfe, #f3e8ff, #fecdd3)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    position: "relative",
  },
  adminBtnContainer: {
    position: "absolute",
    top: "20px",
    right: "30px",
  },
  adminButton: {
    backgroundColor: "#1f2937",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  travelMateSection: {
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  brandName: {
    fontFamily: "'Pacifico', cursive",
    fontSize: "2.2rem",
    color: "#1f2937",
  },
  tagline: {
    fontSize: "1.1rem",
    color: "#6b7280",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "800",
    marginBottom: "1rem",
    textAlign: "center",
    color: "#1f2937",
  },
  subtext: {
    fontSize: "1.25rem",
    color: "#4b5563",
    marginBottom: "2rem",
    textAlign: "center",
    maxWidth: "600px",
  },
  card: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "20px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    width: "100%",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
  },
  dropdownList: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginTop: "4px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    maxHeight: "240px",
    overflowY: "auto",
    zIndex: 10,
  },
  dropdownItem: {
    padding: "0.5rem 1rem",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  qrContainer: {
    textAlign: "center",
    marginTop: "40px",
    marginBottom: "60px",
  },
  qrHeading: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "0.5rem",
  },
  qrImage: {
    width: "200px",
    height: "200px",
    marginTop: "10px",
    borderRadius: "12px",
    border: "1px solid #ccc",
  },
};
