import React from "react";
import BalanceComponent from "./Balance.component";
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

interface Balance {
    person1: string;
    person2: string;
    amount: number;
}

class MainForm extends React.Component<any, any>{

    constructor(props: any) {
        super(props);

        this.state = {
            persons: [],
            expenses: [],
            balances: []
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

    updateBalanceList = (newBalances: Balance[]) => {
        this.setState({ balances: newBalances });
    }

    render() {
        const persons = this.state.persons;
        const expenses = this.state.expenses;
        const balances = this.state.balances;

        return (
            <div>
                <PersonForm persons={persons} updatePersonsList={this.updatePersonsList} />
                <ExpenseForm persons={persons} expenses={expenses} updateExpensesList={this.updateExpensesList} />
                <BalanceComponent
                    persons={persons}
                    expenses={expenses}
                    balances={balances}
                    updateBalanceList={this.updateBalanceList} />
            </div>
        )
    }
}


export default MainForm;
export type { Person, Expense, Balance };