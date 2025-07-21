import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

export default function Navbar1() {
  const navigate = useNavigate();

  return (
    <Navbar
      fixed="top" // ✅ Makes the navbar stick to the top
      expand="lg"
      className="bg-light shadow-sm "
      style={{ backgroundColor: '' , marginTop : '10px'}}
    >
      <Container>
        {/* Logo + Brand */}
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <img
            src="/logo.png" // ✅ Replace with your actual logo path
            width="40"
            height="40"
            className="d-inline-block align-top me-2"
            alt="Logo"
          />
          <span
            style={{
              fontFamily: 'Pacifico, cursive',
              fontSize: '1.8rem',
              color: '#2c3e50',
            }}
          >
            TravelMate
          </span>
        </Navbar.Brand>

        {/* Toggler for mobile view */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navigation links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              style={{ fontWeight: 500, color: '#34495e', marginLeft:'10px' }}
              onClick={() => navigate('/')}
            >
              Home
            </Nav.Link>
            <Nav.Link
              style={{ fontWeight: 500, color: '#34495e', marginLeft:'10px' }}
              onClick={() => navigate('/chat')}
            >
              Trip Planner
            </Nav.Link>
            <Nav.Link
              style={{ fontWeight: 500, color: '#34495e', marginLeft:'10px' }}
              onClick={() => navigate('/whyus')}
            >
              Why Us
            </Nav.Link>
            <Nav.Link
              style={{ fontWeight: 500, color: '#34495e', marginLeft:'10px' }}
              onClick={() => navigate('/details')}
            >
              Details About Your trip
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
