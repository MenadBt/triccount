import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form, Card, ListGroup } from "react-bootstrap";
import axios from 'axios';

interface Trip {
  id: number;
  name: string;
  description: string;
}

interface TripsListProps {}

const Trips: React.FC<TripsListProps> = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [newTripName, setNewTripName] = useState("");
  const [newTripDescription, setNewTripDescription] = useState("");
  const [newTripId, setNewTripId] = useState<number | null>(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    const apiUrl = process.env.REACT_APP_DOMAIN_URL;
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
    };
    axios.get(`${apiUrl}/api/getAllTrips`, 
      { headers: headers })
      .then((response) => setTrips(response.data))
      .catch((error) => console.log(error));
  }, [newTripId]);

  const createNewTrip = () => {
    const apiUrl = process.env.REACT_APP_DOMAIN_URL;
    
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
    };

    axios.post(`${apiUrl}/api/createTrip`, 
      { name: newTripName, description: newTripDescription }, 
      { headers: headers })
      .then((response) => {
        setNewTripId(response.data.id);
        navigate(`/forms/${response.data.id}`);
      })
      .catch((error) => console.log(error));
  };


  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <h1>Mes voyages</h1>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="newTripName">
            <Form.Label>Nom de ton séjour</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nom"
              value={newTripName}
              onChange={(e) => setNewTripName(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="newTripDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              value={newTripDescription}
              onChange={(e) => setNewTripDescription(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Button variant="primary" onClick={createNewTrip}>
            Créer un nouveau séjour
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup>
            {trips.map((trip) => (
              <ListGroup.Item key={trip.id} className="mb-2">
                <Card>
                  <Card.Body>
                    <Card.Title>
                      <a href={`/forms/${trip.id}`}>{trip.name}</a>
                    </Card.Title>
                    <Card.Text>{trip.description}</Card.Text>
                  </Card.Body>
                </Card>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};


export default Trips;
export type { Trip };


