import React from 'react';
import { Expense } from '../MainForm.component';
import { Table } from 'react-bootstrap';

interface ExpenseListProps {
  expenses: Expense[];
  deleteExpense: (index: number) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, deleteExpense }) => {
  return (
    <div className="border rounded p-3 my-3">
      <h3>Dépenses</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Montant</th>
            <th>Description</th>
            <th>Personne</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.amount}</td>
              <td>{expense.description}</td>
              <td>{expense.person}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteExpense(index);
                  }}
                >
                  &times;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ExpenseList;
