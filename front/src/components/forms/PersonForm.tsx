import React from "react";
import { Person } from "../Forms.component";
import PersonList from "../PersonsList.component";

export const formStyle = {
    textAlign: 'center' as 'center',
    margin: '10px',
    padding: '10px',
    borderRadius: '5px',
    width: '600px',
    height: 'auto',
    overflow: 'auto',
    border: '1px solid black',
};


export const inputStyle = {
    margin: '10px',
    padding: '10px',
    borderRadius: '5px',
    width: '100px',
    height: '10px',
    overflow: 'auto',
    textAlign: 'center' as 'center'
};

export const submitStyle = {
    margin: '10px',
    padding: '10px',
    borderRadius: '5px',
    width: '100px',
    height: '50px',
    overflow: 'auto',
    textAlign: 'center' as 'center'
};


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

        for (let person of this.state.persons) {
            if (person.name === newPerson.name) {
                alert("Cette personne est déjà dans la liste");
                return;
            }
        }

        if (newPerson.night < 1) {
            alert("Le nombre de nuits doit être supérieur à 0");
            return;
        }

        if (newPerson.name === "") {
            alert("Le nom ne peut pas être vide");
            return;
        }

        console.log(newPerson.name, newPerson.night)

        this.props.updatePersonsList([...this.state.persons, newPerson]);

        this.setState(prevState => ({
            persons: [...prevState.persons, newPerson],
            value: ''
        }));
    }

    render() {
        return (
            <div style={formStyle}>
                <PersonList persons={this.state.persons} />
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input style={inputStyle} 
                               placeholder="Nom"
                               type="text"
                               name="name"
                               value={this.state.value} 
                               onChange={this.handleChange} />
                    </label>
                    <label>
                        <input style={inputStyle} 
                               placeholder="Nuits"
                               type="number"
                               name="night" />
                        
                    </label>
                    <input style={submitStyle} type="submit" value="Ajouter" />
                </form>
            </div>
        )
    }
}



export default PersonForm;