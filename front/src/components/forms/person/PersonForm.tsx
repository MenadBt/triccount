import React, { useState, useEffect } from "react";
import { Person } from "../MainForm.component";
import PersonList from "./PersonsList.component";
import { Form, Button, Row, Col } from "react-bootstrap";

const PersonForm: React.FC<{
  persons: Person[];
  updatePersonsList: (persons: Person[]) => void;
  removePerson: (personName: string) => void;
}> = ({ persons, updatePersonsList, removePerson }) => {
  const [name, setName] = useState("");
  const [night, setNight] = useState(0);

  useEffect(() => {
    setName("");
    setNight(0);
  }, [persons]);

  const handleRemovePerson = (personName: string) => {
    removePerson(personName);
  };

  // Add a new person to the databse
  const apiUrl = process.env.REACT_APP_DOMAIN_URL;

  const addPersonToDb = async (person: Person) => {
    await fetch(`${apiUrl}/api/createPerson`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trip_id = 1; // todo: get trip id from db

    const newPerson: Person = { name, night, trip_id };

    if (persons.some((person) => person.name === newPerson.name)) {
      alert("Cette personne est déjà dans la liste");
      return;
    }

    if (newPerson.night < 1) {
      alert("Le nombre de nuits doit être supérieur à 0");
      return;
    }

    if (newPerson.name === "") {
      alert("Le nom ne peut pas être vide");
      return;
    }

    addPersonToDb(newPerson);
    updatePersonsList([...persons, newPerson]);
  };

  return (
    <div className="border rounded p-3 my-3">
      <PersonList
        persons={persons}
        handleRemovePerson={handleRemovePerson}
      />
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="formName">
              <Form.Control
                placeholder="Nom"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formNight">
              <Form.Control
                placeholder="Nuits"
                type="number"
                name="night"
                value={night}
                onChange={(e) => setNight(Number(e.target.value))}
              />
            </Form.Group>
          </Col>
          <Col xs="auto">
            <Button variant="primary" type="submit">
              Ajouter
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default PersonForm;
