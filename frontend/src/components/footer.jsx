import { Container, Row, Col } from 'react-bootstrap';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaEnvelope
} from 'react-icons/fa';

export function Footer() {
  return (
    <footer
      style={{
        background: 'linear-gradient(90deg, #001f3f, #0074D9, #7FDBFF)',
        color: '#f1f1f1',
        paddingTop: '50px',
        paddingBottom: '30px',
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <Container>
        <Row className="text-center text-md-start">
          <Col xs={12} md={4} className="mb-4">
            <h4 className="text-white">TravelMate</h4>
            <p style={{ fontSize: '14px', lineHeight: '1.8' }}>
              Your AI-powered travel companion. Plan, explore, and fly smarter with personalized recommendations.
            </p>
          </Col>

          <Col xs={12} md={4} className="mb-4">
            <h5 className="text-white">Contact Us</h5>
            <p style={{ fontSize: '14px' }}>
              <FaEnvelope style={{ marginRight: '10px' }} />
              support@wanderwise.ai
            </p>
            <p style={{ fontSize: '14px' }}>Phone: +91 98765 43210</p>
          </Col>

          <Col xs={12} md={4}>
            <h5 className="text-white">Follow Us</h5>
            <div className="d-flex justify-content-center justify-content-md-start mt-3 flex-wrap gap-2">
              {[
                { icon: <FaFacebookF />, link: 'https://facebook.com/wanderwise' },
                { icon: <FaTwitter />, link: 'https://twitter.com/wanderwise' },
                { icon: <FaLinkedinIn />, link: 'https://linkedin.com/company/wanderwise' },
                { icon: <FaInstagram />, link: 'https://instagram.com/wanderwise' },
                { icon: <FaYoutube />, link: 'https://youtube.com/@wanderwise' },
              ].map(({ icon, link }, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="m-1"
                  style={{
                    backgroundColor: '#ffffff22',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: '0.3s',
                    textDecoration: 'none',
                    color: '#f1f1f1',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#7FDBFF';
                    e.currentTarget.style.color = '#001f3f';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff22';
                    e.currentTarget.style.color = '#f1f1f1';
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </Col>
        </Row>

        <hr style={{ backgroundColor: '#ffffff22' }} />

        <Row className="text-center mt-3">
          <Col>
            <p style={{ fontSize: '13px', marginBottom: '0' }}>
              © {new Date().getFullYear()} TravelMate. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
