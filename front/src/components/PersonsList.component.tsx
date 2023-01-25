import React from 'react';
import { Person } from './Forms.component';

const personStyle = {
    textAlign: 'center' as 'center',
    margin: 'auto',
    padding: 'auto',
    borderRadius: '5px',
    width: '300px',
    height: 'auto',
    overflow: 'auto'
};

const tableStyle = {
    borderCollapse: 'collapse' as 'collapse',
    width: '100%'
};

class PersonList extends React.Component<{ persons: Person[] }> {
    render() {
        return (
            <div style={personStyle}>
                <h3>Personnes</h3>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Nuits</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.persons.map((person, index) =>
                            <tr key={index}>
                                <td>{person.name}</td> 
                                <td>{person.night}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default PersonList;