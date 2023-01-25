import React from "react";
import { Balance, Expense, Person } from "./Forms.component";
import axios from 'axios';


async function getBalances(persons: Person[], expenses: Expense[]): Promise<Balance[]> {
    try {
        const newBalances = await axios.post<Balance[]>(
            'http://triccount-imali.fr/api/getBalances',
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

const balanceStyle = {
    textAlign: 'center' as 'center',
    margin: '10px',
    padding: '10px',
    borderRadius: '5px',
    width: '300px',
    height: 'auto',
    overflow: 'auto',
    border: '1px solid black',
};


export const submitStyle = {
    // center the button
    margin: 'auto',
    padding: 'auto',
    borderRadius: '5px',
    width: 'auto',
    height: '50px',
    overflow: 'auto',
    textAlign: 'center' as 'center'
};



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
            <div style={balanceStyle}>
                <div>
                    {
                        <ul>
                            {
                                this.state.balances.map((balance, index) =>
                                    <li key={index}><b>{balance.person1}</b> doit à <b>{balance.person2}</b> {balance.amount} euros</li>)
                            }
                        </ul>
                    }
                </div>

                <form onSubmit={this.handleSubmit}>
                    <input style={submitStyle} type="submit" value="Faire les comptes" />
                </form>
            </div>
        )
    }
}



export default BalanceComponent;