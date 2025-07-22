import React from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Bar, Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const AdminDashboard = () => {
  const tripStats = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Trips Planned",
        backgroundColor: "#0d6efd",
        borderRadius: 5,
        data: [45, 60, 80, 70, 95, 110],
      },
    ],
  };

  const botUsage = {
    labels: ["Chatbot", "WhatsApp", "Web"],
    datasets: [
      {
        data: [55, 30, 15],
        backgroundColor: ["#198754", "#ffc107", "#6610f2"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <Container fluid style={{ backgroundColor: "#f4f6f9", minHeight: "100vh", padding: "40px 20px" }}>
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold text-center mb-3" style={{ fontSize: "2.5rem" }}>
            Admin Dashboard
          </h2>
          <p className="text-center text-muted mb-0" style={{ fontSize: "1.05rem" }}>
            Welcome back! Manage platform insights and operations efficiently.
          </p>
        </Col>
      </Row>

      {/* Summary Cards */}
      <Row className="mb-5">
        {[
          {
            title: "Total Trips",
            value: "6,842",
            subtitle: "All time",
            bg: "#ffffff",
            borderColor: "#0d6efd",
          },
          {
            title: "Active Users",
            value: "1,204",
            subtitle: "Last 30 days",
            bg: "#ffffff",
            borderColor: "#20c997",
          },
          {
            title: "Support Tickets",
            value: "23",
            subtitle: "Pending",
            bg: "#ffffff",
            borderColor: "#fd7e14",
          },
        ].map((card, idx) => (
          <Col md={4} key={idx} className="mb-4">
            <Card
              className="shadow-sm h-100 border-0"
              style={{
                background: card.bg,
                borderLeft: `5px solid ${card.borderColor}`,
                borderRadius: "12px",
              }}
            >
              <Card.Body>
                <h6 className="text-uppercase text-muted mb-2">{card.title}</h6>
                <h3 className="fw-semibold">{card.value}</h3>
                <p className="text-muted small mb-1">{card.subtitle}</p>
                {card.title === "Support Tickets" && (
                  <Button variant="outline-dark" size="sm">
                    View Tickets
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Charts */}
      <Row className="mb-5">
        <Col md={8}>
          <Card className="shadow-sm border-0 mb-4" style={{ borderRadius: "12px" }}>
            <Card.Body>
              <Card.Title className="mb-4 fw-bold">Monthly Trip Statistics</Card.Title>
              <Bar data={tripStats} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm border-0 mb-4" style={{ borderRadius: "12px" }}>
            <Card.Body>
              <Card.Title className="mb-4 fw-bold">Bot Usage Distribution</Card.Title>
              <Doughnut data={botUsage} />
              <div className="mt-3">
                {["Chatbot", "WhatsApp", "Web"].map((label, i) => (
                  <div key={i} className="d-flex justify-content-between small">
                    <span>{label}</span>
                    <Badge
                      bg={
                        i === 0
                          ? "success"
                          : i === 1
                          ? "warning text-dark"
                          : "primary"
                      }
                    >
                      {botUsage.datasets[0].data[i]}%
                    </Badge>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Welcome Message */}
      <Row>
        <Col>
          <Card className="shadow-sm border-0" style={{ borderRadius: "12px" }}>
            <Card.Body>
              <h5 className="fw-bold mb-2">Welcome, Administrator</h5>
              <p className="text-muted mb-2" style={{ fontSize: "1rem" }}>
                You have full control over the TravelMate ecosystem. Monitor usage patterns, address support requests, and maintain operational excellence.
              </p>
              <Button variant="primary">Go to User Management</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
