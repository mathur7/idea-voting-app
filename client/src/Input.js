import React, { Component } from 'react';

class Input extends Component {
    render() {
        return (
            <input 
                id={this.props.name}
                required
                type={this.props.type}
                placeholder={this.props.placeholder}
                onChange={this.handleChange}
                ref="input"
            />
        );
    }
};


export default Input;
