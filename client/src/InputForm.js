import React, { Component } from 'react';
import Input from './Input';

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(event) {
    event.preventDefault();
    var idea = this.idea.refs.input.value;
    var email = this.email.refs.input.value;
    var data = {
      description: idea,
      email: email
    }
    this.props.onInputSubmit(data);
    this.idea.refs.input.value = '';
    this.email.refs.input.value = '';
  }

  render() {
    return (
      <form className="form-container">
        <Input type="text" placeholder="Enter your idea" name="idea" ref={ component => this.idea = component } />
        <Input type="text" placeholder="Enter your email" name="email"  ref={ component => this.email = component } />
        <input type="submit" onClick={this.submitForm} />
      </form>
    )
  }
}

export default InputForm;
