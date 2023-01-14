import React from "react";


class PersonForm extends React.Component {
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
                        Personne:
                        <input type="text" name="name" />
                    </label>
                    <label>
                        Nuité:
                        <input type="number" name="night" />
                    </label>
                    <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default PersonForm;