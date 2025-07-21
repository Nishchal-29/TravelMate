import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar1() {
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Trip Planner', path: '/chat' },
    { name: 'Why Us ?', path: '/whyus' },
    { name: 'Details About Your Trip', path: '/details' },
  ];

  return (
    <Navbar
      fixed="top"
      expand="lg"
      className="bg-white shadow-sm"
      style={{ paddingTop: '8px', paddingBottom: '8px' }}
    >
      <Container>
        {/* Logo + Brand */}
        <Navbar.Brand
          onClick={() => navigate('/')}
          className="d-flex align-items-center cursor-pointer"
          style={{ cursor: 'pointer' }}
        >
          <img
            src="/logo.png"
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

        {/* Toggler for mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto gap-2">
            {navLinks.map((link, idx) => {
              const isActive = location.pathname === link.path;
              return (
                <Nav.Link
                  key={idx}
                  onClick={() => navigate(link.path)}
                  className={`px-3 py-2 rounded-pill text-center transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-dark hover:bg-primary hover:text-white'
                  }`}
                  style={{
                    fontWeight: 500,
                    border: isActive ? 'none' : '1px solid #ced4da',
                    fontSize: '0.95rem',
                  }}
                >
                  {link.name}
                </Nav.Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
