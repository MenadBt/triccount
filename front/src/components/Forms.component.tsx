import React from "react";
import ExpenseForm from "./forms/ExpenseForm";
import PersonForm from "./forms/PersonForm";

interface Person {
    name: string;
    night: number;
}

interface Expense {
    amount: number;
    description: string;
    person: string;
}

class MainForm extends React.Component <any, any>{

    constructor(props: any) {
        super(props);

        this.state = {
            persons: [],
            expenses: []
        }

        this.updatePersonsList = this.updatePersonsList.bind(this);
        this.updateExpensesList = this.updateExpensesList.bind(this);
    }

    updatePersonsList = (newPersons: Person[]) => {
        this.setState({ persons: newPersons });
    }


    updateExpensesList = (newExpenses: Expense[]) => {
        this.setState({ expenses: newExpenses });
    }

    render() {

        const persons = this.state.persons;
        const expenses = this.state.expenses;

        return (
            <div>
                <PersonForm persons={persons} updatePersonsList={this.updatePersonsList} /> 
                <ExpenseForm persons={persons} expenses={expenses} updateExpensesList={this.updateExpensesList} />
            </div>
        )
    }
}


export default MainForm;
export type { Person, Expense };