import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaGlobe, FaHeadset, FaWrench, FaMoneyCheckAlt, FaClock, FaSmile } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { Footer } from '../components/footer';
import { useNavigate } from 'react-router-dom';

export const WhyUs = () => {
    const navigate = useNavigate()
  return (
    <>
      <div
        style={{
          background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
          color: '#fff',
          padding: '80px 0 30px',
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <Navbar />
        <Container className="px-3 px-md-0">
          <Row className="text-center">
            <Col>
              <h2 className="mb-4" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', marginTop:'10px' }}>
                Why Choose TravelMate?
              </h2>
              <p style={{ fontSize: '16px', color: '#e0e0e0', maxWidth: '700px', margin: '0 auto' }}>
                We combine cutting-edge AI with a passion for travel to help you plan seamless, cost-effective,
                and unforgettable trips around the world.
              </p>
            </Col>
          </Row>

          {/* Why Us Cards */}
          <Row className="mt-5 text-center">
            {[{
              icon: <FaGlobe size={50} style={{ color: '#00c6ff' }} />,
              title: 'Smart Destination Picks',
              desc: 'AI suggests the best destinations and attractions tailored to your interests and travel style.'
            }, {
              icon: <FaHeadset size={50} style={{ color: '#00c6ff' }} />,
              title: '24/7 Support',
              desc: 'Get round-the-clock support throughout your journey with our integrated travel assistant.'
            }, {
              icon: <FaMoneyCheckAlt size={50} style={{ color: '#00c6ff' }} />,
              title: 'Affordable Travel',
              desc: 'We help you find the best deals on flights, trains, and stays—making your trip budget-friendly.'
            }, {
              icon: <FaClock size={50} style={{ color: '#00c6ff' }} />,
              title: 'Save Time',
              desc: 'No more endless searching—get instant travel itineraries and smart recommendations.'
            }, {
              icon: <FaWrench size={50} style={{ color: '#00c6ff' }} />,
              title: 'Custom Itineraries',
              desc: 'Your plans, your way. Build your own trip or let AI do the planning for you.'
            }, {
              icon: <FaSmile size={50} style={{ color: '#00c6ff' }} />,
              title: 'Hassle-Free Experience',
              desc: 'Everything in one place—flights, trains, hotels, and guidance—so you can just enjoy the ride.'
            }].map(({ icon, title, desc }, idx) => (
              <Col xs={12} md={4} className="mb-4" key={idx}>
                <Card className="shadow-lg border-0 h-100" style={{ background: '#1f1f2f', borderRadius: '15px' }}>
                  <Card.Body className="d-flex flex-column align-items-center text-center">
                    {icon}
                    <Card.Title className="mt-4 text-white">{title}</Card.Title>
                    <Card.Text style={{ fontSize: '16px', color: '#e0e0e0' }}>{desc}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Call To Action */}
          <Row className="mt-5 text-center">
            <Col>
              <h3 className="text-white" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}>
                Let's Plan Your Next Adventure!
              </h3>
              <p style={{ fontSize: '16px', color: '#e0e0e0' }}>
                Whether it's a quick getaway or a long vacation, TravelMate is your intelligent travel partner.
              </p>
              <Button
                variant="light"
                size="lg"
                className="mt-4"
                onClick={() => navigate('/')}
                style={{
                  background: '#00c6ff',
                  borderRadius: '30px',
                  fontSize: '18px',
                  padding: '15px 35px',
                  color: '#fff',
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
