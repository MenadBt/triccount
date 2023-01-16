import React from "react";
import { Expense, Person } from "../Forms.component";


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
                    <h3>List of expenses</h3>
                    <ul>
                        {
                            this.state.expenses.map((expense, index) =>
                                <li key={index}>Montant:{expense.amount} | Description: {expense.description} | Personne: {expense.person}</li>)
                        }
                    </ul>
                </div>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Amount
                        <input type="number" name="amount" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <label>
                        Description
                        <input type="text" name="description" />
                    </label>
                    <label>
                        Personne
                        <select name="persons" id="person">
                            {
                                persons.map((person, index) =>
                                    <option key={person.name}> {person.name} </option>
                                )
                            }
                        </select>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default ExpenseForm;