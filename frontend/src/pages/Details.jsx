import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  Spinner,
  ToggleButtonGroup,
  ToggleButton,
} from 'react-bootstrap';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Footer } from '../components/footer';

export default function Details() {
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('hotels');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dstn = localStorage.getItem('destination');
    if (dstn && dstn !== 'null') setCity(dstn);
  }, []);

  const fetchResults = async () => {
    if (!city.trim()) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/${category}?to=${city}`
      );
      const keyMap = {
        hotels: 'hotels',
        restaurants: 'restaurants',
        places: 'places',
      };
      setResults(res.data[keyMap[category]] || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  const getHeading = () => {
    if (category === 'hotels') return 'Hotels';
    if (category === 'restaurants') return 'Restaurants';
    return 'Tourist Attractions';
  };

  return (
    <>
      <div style={{ backgroundColor: 'black' }}>
        <Navbar />

        {/* Hero Section */}
        <div
          style={{
            backgroundImage: `url(https://www.craftedbeds.co.uk/cdn/shop/articles/c6229643564835.57f4204983b16.jpg?v=1654414798)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: '80px',
            paddingBottom: '40px',
          }}
        >
          <Container className="text-white text-center px-4">
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 'bold' }}>
              Explore Hotels, Restaurants & Attractions
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', marginTop: '20px' }}>
              Discover top-rated places in {city || 'your city'} for a perfect stay, dine & explore
            </p>

            {/* Search Form */}
            <Form
              className="mt-4"
              onSubmit={(e) => {
                e.preventDefault();
                fetchResults();
              }}
            >
              <Row className="justify-content-center align-items-center g-2">
                <Col xs={12} md={5}>
                  <Form.Control
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <ToggleButtonGroup
                    type="radio"
                    name="category"
                    value={category}
                    onChange={(val) => setCategory(val)}
                  >
                    <ToggleButton id="hotel" value="hotels" variant="outline-light">
                      Hotels
                    </ToggleButton>
                    <ToggleButton id="rest" value="restaurants" variant="outline-light">
                      Restaurants
                    </ToggleButton>
                    <ToggleButton id="place" value="places" variant="outline-light">
                      Best Places
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Col>
                <Col xs="auto">
                  <Button variant="light" type="submit">
                    {loading ? <Spinner animation="border" size="sm" /> : 'Search'}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </div>

        {/* Results Section */}
        <div style={{ background: 'linear-gradient(white, cyan)', padding: '60px 0' }}>
          <Container>
            {results.length > 0 ? (
              <>
                <h2 className="text-center mb-4">
                  Top {getHeading()} in {city}
                </h2>
                <Row xs={1} md={2} lg={3} className="g-4">
                  {results.map((item, idx) => (
                    <Col key={idx}>
                      <Card className="h-100 shadow-sm">
                        <Card.Img
                          variant="top"
                          src={item.image || '/placeholder-hotel.jpg'}
                          alt={item.name}
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
                        <Card.Body>
                          <Card.Title>{item.name || 'Unnamed'}</Card.Title>
                          <Card.Text>{item.address || 'No address available'}</Card.Text>
                          {item.rating && (
                            <Card.Text>
                              ⭐ <strong>{item.rating}</strong>
                            </Card.Text>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </>
            ) : (
              <p className="text-center text-dark fs-5">No results yet. Enter a city and search.</p>
            )}
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
}
