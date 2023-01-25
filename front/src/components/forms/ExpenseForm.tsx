import React from "react";
import ExpenseList from "../ExpenseList.component";
import { Expense, Person } from "../Forms.component";
import { inputStyle, submitStyle } from "./PersonForm";

const selectStyle = {
    margin: '10px',
    padding: '10px',
    borderRadius: '5px',
    width: 'auto',
    height: '60px',
    overflow: 'auto',
    textAlign: 'center' as 'center'
};


const formStyle = {
    textAlign: 'center' as 'center',
    margin: '10px',
    padding: '10px',
    borderRadius: '5px',
    width: '700px',
    height: 'auto',
    overflow: 'auto',
    border: '1px solid black',
 };

class ExpenseForm extends React.Component<
    { persons: Person[], expenses: Expense[], updateExpensesList: (expenses: Expense[]) => void },
    { value: string, expenses: Expense[], persons: Person[] }>
{
    constructor(props: any) {
        super(props);

        this.state = {
            value: '',
            expenses: [],
            persons: props.persons
        };


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any) {
        this.setState({ 
            value: event.target.value 
        });
    }

    handleSubmit(event: any) {
        event.preventDefault();

        const amount = event.target.amount.value;
        const description = event.target.description.value;
        const person = event.target.person.value;

        const newExpense: Expense = { amount, description, person };

        if (description === "" || amount === "" || person === "") {
            alert("Une donnée est manquante dans le formulaire");
            return;
        }

        if(amount < 0) {
            alert("Le montant ne peut pas être négatif");
            return;
        }

        this.props.updateExpensesList([...this.props.expenses, newExpense]);

        this.setState(prevState => ({
            expenses: [...prevState.expenses, newExpense],
            persons: prevState.persons,
            value: ''
        }));
    }

    render() {

        const persons = this.props.persons;

        return (
            <div style={formStyle}>
                <ExpenseList expenses={this.state.expenses}/>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input style={inputStyle}
                                placeholder="Montant" 
                                type="number"
                                name="amount"
                                value={this.state.value}
                                onChange={this.handleChange} />
                    </label>
                    <label>
                        <input 
                            style={inputStyle}
                            placeholder="Description" 
                            type="text"
                            name="description" />
                    </label>
                    <label>
                        <select style={selectStyle} name="persons" id="person">
                            <option value="" disabled selected>Indiquer une personne</option>
                            {
                                persons.map((person, index) =>
                                    <option key={person.name}> {person.name} </option>
                                )
                            }
                        </select>
                    </label>
                    <input style={submitStyle} type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default ExpenseForm;