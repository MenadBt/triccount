import React from "react";
import { Balance, Expense, Person } from "./Forms.component";
import axios from 'axios';


async function getBalances(persons: Person[], expenses: Expense[]): Promise<Balance[]> {
    try {
        const newBalances = await axios.post<Balance[]>(
            'http://localhost:8080/getBalances',
            { persons: persons, expenses: expenses },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }
        ).then(response => response.data);

        return newBalances;

    } catch (error) {
        console.log(error);
        return [];
    }
}

class BalanceComponent extends React.Component<
    { persons: Person[], expenses: Expense[], balances: Balance[], updateBalanceList: (newBalances: Balance[]) => void },
    { persons: Person[], expenses: Expense[], balances: Balance[] }>
{
    constructor(props: any) {
        super(props);

        this.state = {
            persons: this.props.persons,
            expenses: this.props.expenses,
            balances: this.props.balances
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event: any) {
        event.preventDefault();

        const newBalances = await getBalances(this.props.persons, this.props.expenses);

        this.setState({ balances: newBalances });
        this.props.updateBalanceList(newBalances);
    }

    render() {
        return (
            <div>
                <div>
                    <h3>List of balances</h3>
                    {
                        <ul>
                            {
                                this.state.balances.map((balance, index) =>
                                    <li key={index}>{balance.person1} doit à {balance.person2} {balance.amount} euros</li>)
                            }
                        </ul>
                    }
                </div>

                <form onSubmit={this.handleSubmit}>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}



export default BalanceComponent;