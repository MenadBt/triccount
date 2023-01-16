import React from "react";
import { Person } from "../Forms.component";

class PersonForm extends React.Component<
    { persons: Person[], updatePersonsList: (persons: Person[]) => void },
    { value: string, persons: Person[] }>
{
    constructor(props: any) {
        super(props);

        this.state = { value: '', persons: this.props.persons };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event: any) {
        event.preventDefault();

        const name = event.target.name.value;
        const night = event.target.night.value;
        const newPerson: Person = { name, night };

        this.props.updatePersonsList([...this.state.persons, newPerson]);

        this.setState(prevState => ({
            persons: [...prevState.persons, newPerson],
            value: ''
        }));
    }

    render() {
        return (
            <div>
                <div>
                    <h3>List of persons</h3>
                    <ul>
                        {this.state.persons.map((person, index) =>
                            <li key={index}>{person.name} - {person.night} nuités</li>
                        )}
                    </ul>
                </div>
                
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Personne:
                        <input type="text" name="name" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <label>
                        Nuité:
                        <input type="number" name="night" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}



export default PersonForm;