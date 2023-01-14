import React from "react";


class ExpenseForm extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event: any) {    this.setState({value: event.target.value});  }
      handleSubmit(event: any) {
        alert('A name was submitted: ');
        event.preventDefault();
      }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                    <label>
                        Amount:
                        <input type="number" name="amount" />
                    </label>
                    <label>
                        Date:
                        <input type="date" name="date" />
                    </label>
                    <label>
                        Description:
                        <input type="text" name="description" />
                    </label>
                    <label>
                        Person:
                        <select name="personne" id="person">
                            <option value="Ménad">Ménad</option>
                            <option value="Sarah">Sarah</option>
                            <option value="Emma">Emma</option>
                        </select>
                    </label>
                    <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default ExpenseForm;