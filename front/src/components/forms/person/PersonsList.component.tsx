import React from 'react';
import { Person } from '../MainForm.component';
import { Table } from 'react-bootstrap';

interface PersonListProps {
  persons: Person[];
  handleRemovePerson: (personName: string) => void;
}

const PersonList: React.FC<PersonListProps> = ({ persons, handleRemovePerson }) => {
  return (
    <div className="border rounded p-3 my-3">
      <h3>Personnes</h3>
      <Table responsive bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Nuits</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person, index) => (
            <tr key={index}>
              <td>{person.name}</td>
              <td>{person.night}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemovePerson(person.name)}
                >
                  &times;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PersonList;
