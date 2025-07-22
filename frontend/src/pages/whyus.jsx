import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaGlobe, FaHeadset, FaWrench, FaMoneyCheckAlt, FaClock, FaSmile } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { Footer } from '../components/footer';
import { useNavigate } from 'react-router-dom';

export const WhyUs = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          background: 'linear-gradient(to right, #e0f7fa, #fce4ec, #f3e5f5)',
          color: '#1f2937',
          padding: '80px 0 30px',
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <Navbar />
        <Container className="px-3 px-md-0">
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', marginTop: '10px' }}>
                Why Choose TravelMate?
              </h2>
              <p style={{ fontSize: '16px', color: '#374151', maxWidth: '700px', margin: '0 auto' }}>
                We combine cutting-edge AI with a passion for travel to help you plan seamless, cost-effective,
                and unforgettable trips around the world.
              </p>
            </Col>
          </Row>

          <Row className="text-center">
            {[
              {
                icon: <FaGlobe size={50} className="text-primary" />,
                title: 'Smart Destination Picks',
                desc: 'AI suggests the best destinations and attractions tailored to your interests and travel style.'
              },
              {
                icon: <FaHeadset size={50} className="text-primary" />,
                title: '24/7 Support',
                desc: 'Get round-the-clock support throughout your journey with our integrated travel assistant.'
              },
              {
                icon: <FaMoneyCheckAlt size={50} className="text-primary" />,
                title: 'Affordable Travel',
                desc: 'We help you find the best deals on flights, trains, and stays—making your trip budget-friendly.'
              },
              {
                icon: <FaClock size={50} className="text-primary" />,
                title: 'Save Time',
                desc: 'No more endless searching—get instant travel itineraries and smart recommendations.'
              },
              {
                icon: <FaWrench size={50} className="text-primary" />,
                title: 'Custom Itineraries',
                desc: 'Your plans, your way. Build your own trip or let AI do the planning for you.'
              },
              {
                icon: <FaSmile size={50} className="text-primary" />,
                title: 'Hassle-Free Experience',
                desc: 'Everything in one place—flights, trains, hotels, and guidance—so you can just enjoy the ride.'
              }
            ].map(({ icon, title, desc }, idx) => (
              <Col xs={12} md={6} lg={4} className="mb-4" key={idx}>
                <Card className="h-100 shadow-lg border-0" style={{ borderRadius: '18px', backgroundColor: '#ffffffee' }}>
                  <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                    <div className="mb-3">{icon}</div>
                    <Card.Title className="fw-semibold text-dark">{title}</Card.Title>
                    <Card.Text style={{ fontSize: '15px', color: '#4b5563' }}>{desc}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Row className="text-center mt-5">
            <Col>
              <h3 className="fw-bold" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', color: '#1f2937' }}>
                Let's Plan Your Next Adventure!
              </h3>
              <p style={{ fontSize: '16px', color: '#374151' }}>
                Whether it's a quick getaway or a long vacation, TravelMate is your intelligent travel partner.
              </p>
              <Button
                variant="primary"
                size="lg"
                className="mt-3"
                onClick={() => navigate('/')}
                style={{
                  borderRadius: '30px',
                  fontSize: '18px',
                  padding: '12px 30px',
                  backgroundColor: '#3b82f6',
                  border: 'none'
                }}
              >
                Start Planning
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};
