import React from "react";
import ExpenseList from "./ExpenseList.component";
import {Expense, Person} from "../MainForm.component";

class ExpenseForm extends React.Component<
    { persons: Person[], expenses: Expense[], updateExpensesList: (expenses: Expense[]) => void },
    { value: string, expenses: Expense[], persons: Person[] }> {
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

        const newExpense: Expense = {amount, description, person};

        if (description === "" || amount === "" || person === "") {
            alert("Une donnée est manquante dans le formulaire");
            return;
        }

        if (amount < 0) {
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

    componentDidUpdate(prevProps: any) {
        if (prevProps.expenses !== this.props.expenses) {
            this.setState({expenses: this.props.expenses});
        }
    }

    deleteExpense = (index: number) => {
        const updatedExpenses = this.state.expenses.filter(
            (_: Expense, i: number) => i !== index
        );

        this.props.updateExpensesList(updatedExpenses);

        this.setState({expenses: updatedExpenses});
    };


    render() {

        const persons = this.props.persons;

        return (
            <div className="card m-3">
                <ExpenseList
                    expenses={this.props.expenses}
                    deleteExpense={this.deleteExpense}/>

                <form onSubmit={this.handleSubmit} className="m-3">
                    <div className="form-group">
                        <input className="form-control mb-2"
                            placeholder="Montant"
                            type="number"
                            name="amount"
                            value={this.state.value}
                            onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control mb-2"
                            placeholder="Description"
                            type="text"
                            name="description"/>
                    </div>
                    <div className="form-group">
                        <select className="form-control mb-2" name="persons" id="person">
                            <option value="" disabled selected>Indiquer une personne</option>
                            {
                                persons.map((person, index) =>
                                    <option key={person.name}> {person.name} </option>
                                )
                            }
                        </select>
                    </div>
                    <button className="btn btn-primary" type="submit">Ajouter</button>
                </form>
            </div>
        )
    }
}

export default ExpenseForm;
