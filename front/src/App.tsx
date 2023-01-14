import './App.css';
import ExpenseForm from './expense';
import PersonForm from './person';


function App() {

  return (
    <div className="App">
      <div>
        <PersonForm />
        <ExpenseForm />
      </div>
    </div>
  );
}

export default App;
