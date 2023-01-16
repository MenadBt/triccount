import React from 'react';
import './App.css';
import ExpenseForm from './forms/ExpenseForm';
import PersonForm from './forms/PersonForm';

interface Person {
  name: string;
  night: number;
}

interface Expense {
  amount: number;
  description: string;
  person: string;
}

class App extends React.Component {
  state = {
    persons: [],
    expenses: []
  }

  updatePersonsList = (newPersons: Person[]) => {
    this.setState({ persons: newPersons });
  }


  updateExpensesList = (newExpenses: Expense[]) => {
    this.setState({ expenses: newExpenses });
  }

  render() {
    return (
      <div>
        <PersonForm updatePersonsList={this.updatePersonsList} />
        <ExpenseForm updateExpensesList={this.updateExpensesList}/>
      </div>
    );
  }
}

export default App;
export type { Person, Expense };
