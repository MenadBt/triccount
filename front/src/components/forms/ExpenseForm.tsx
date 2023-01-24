import React from "react";
import { Expense, Person } from "../Forms.component";
import { inputStyle, submitStyle } from "./PersonForm";

// Style for select input
const selectStyle = {
    margin: '10px',
    padding: '10px',
    borderRadius: '5px',
    width: '140px',
    height: '35px',
    overflow: 'auto',
    textAlign: 'center' as 'center'
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


        for (let expense of this.props.expenses) {
            if (description === "" || amount === "" || person === "") {
                alert("Une donnée est manquante dans le formulaire");
                return;
            }
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
            <div>
                <div>
                    <h3>Dépenses</h3>
                    <ul>
                        {
                            this.state.expenses.map((expense, index) =>
                                <li key={index}>Montant:{expense.amount} | Description: {expense.description} | Personne: {expense.person}</li>)
                        }
                    </ul>
                </div>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input style={inputStyle}
                                placeholder="Amount" 
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