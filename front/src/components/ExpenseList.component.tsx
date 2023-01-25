import React from 'react';
import { Expense } from './Forms.component';

const expenseStyle = {
    textAlign: 'center' as 'center',
    margin: '10px',
    padding: '10px',
    borderRadius: '5px',
    width: '300px',
    height: 'auto',
    overflow: 'auto'
};

const tableStyle = {
    borderCollapse: 'collapse' as 'collapse',
    width: '100%'
};

const tbodyStyle = {
    listStyleType: 'none',
    padding: '0'
};

class ExpenseList extends React.Component<{ expenses: Expense[] }> {
    render() {
        return (
            <div style={expenseStyle}>
                <h3>Dépenses</h3>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th>Montant</th>
                            <th>Description</th>
                            <th>Personne</th>
                        </tr>
                    </thead>
                    <tbody style={tbodyStyle}>
                        {this.props.expenses.map((expense, index) =>
                            <tr key={index}>
                                <td>{expense.amount}</td>
                                <td>{expense.description}</td>
                                <td>{expense.person}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ExpenseList;