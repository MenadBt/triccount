import React from "react";
import { Balance, Expense, Person } from "../MainForm.component";
import axios from 'axios';
import { Button, Form, Table } from 'react-bootstrap';

async function getBalances(persons: Person[], expenses: Expense[]): Promise<Balance[]> {
    try {
        const apiUrl = process.env.REACT_APP_DOMAIN_URL;
        
        const newBalances = await axios.post<Balance[]>(
            `${apiUrl}/api/getBalances`,
            { persons: persons, expenses: expenses },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
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

interface BalanceComponentProps {
    persons: Person[];
    expenses: Expense[];
    balances: Balance[];
    updateBalanceList: (newBalances: Balance[]) => void;
}

class BalanceComponent extends React.Component<BalanceComponentProps, { balances: Balance[] }> {
    constructor(props: any) {
        super(props);

        this.state = {
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
            <div className="border rounded p-3 my-3">
              <h3>Répartition des dépenses</h3>
              <Table responsive bordered hover>
                <thead>
                  <tr>
                    <th>Cette Personne</th>
                    <th>Doit à</th>
                    <th>Ce Montant</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.balances.map((balance, index) => (
                    <tr key={index}>
                      <td>{balance.person1}</td>
                      <td>{balance.person2}</td>
                      <td>{balance.amount} euros</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Form onSubmit={this.handleSubmit}>
                <Button type="submit" className="w-100 mt-3">
                  Faire les comptes
                </Button>
              </Form>
        </div>

        )
    }
}

export default BalanceComponent;
