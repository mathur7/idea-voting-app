import React, { Component } from 'react';
import Input from './Input';

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(event) {
    event.preventDefault();
    var idea = this.idea.refs.input.value.trim();
    var name = this.name.refs.input.value.trim();
    var email = this.email.refs.input.value.trim();
    var data = {
      description: idea,
      name: name,
      email: email
    }
    this.props.onInputSubmit(data);
    this.idea.refs.input.value = '';
    this.name.refs.input.value = '';
    this.email.refs.input.value = '';
  }

  render() {
    return (
      <form className="form-container" >
        <Input type="text" placeholder="Enter your idea (required)" name="idea" ref={ component => this.idea = component } />
        <Input type="text" placeholder="Enter your name (required)" name="name"  ref={ component => this.name = component } />
        <Input type="text" placeholder="Enter your email (required)" name="email"  ref={ component => this.email = component } />
        <button type="submit" onClick={this.submitForm}>Go</button>
      </form>
    )
  }
}

export default InputForm;
