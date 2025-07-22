import React from "react";
import { Container } from "react-bootstrap";

export const Footer = () => {
  return (
    <footer
      style={{
        background: "linear-gradient(to right, #dbeafe, #f3e8ff, #ffe4e6)",
        padding: "2rem 0",
        borderTop: "1px solid #e5e7eb",
        textAlign: "center",
        color: "#1f2937",
        fontFamily: "'Inter', sans-serif",
        boxShadow: "0 -4px 12px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Container>
        <h5
          className="fw-bold"
          style={{ fontFamily: "'Pacifico', cursive", color: "#1f2937" }}
        >
          TravelMate
        </h5>
        <p className="mb-1" style={{ fontSize: "1rem", color: "#4b5563" }}>
          Your trusted AI travel companion
        </p>
        <p className="fw-medium" style={{ fontSize: "1.05rem", marginTop: "10px" }}>
          Chat with our Travel Bot at{" "}
          <a
            href="http://wa.me/+14155238886?text=join%20character-see"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "#3b82f6", fontWeight: "600" }}
          >
            +1 (415) 523-8886
          </a>
        </p>
        <p className="text-muted" style={{ fontSize: "0.9rem", marginTop: "1rem" }}>
          &copy; {new Date().getFullYear()} TravelMate. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};
