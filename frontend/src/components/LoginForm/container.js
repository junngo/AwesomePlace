import React, { Component } from "react";
import LoginFrom from "./presenter";

// const Container = props => <LoginFrom {...props} />;

class Container extends Component {
    state = {
        username: "",
        password: ""
    };

    render() {
        const { username, password } = this.state;
        return (
            <LoginFrom 
                handleInputChange={this._handleInputChange} 
                handleSubmit={this._handleSubmit}
                usernameValue={username} 
                passwordValue={password}
            />
        );
    }

    _handleInputChange = event => {
        // console.log(event.target.value);
        const { target : { value, name }} = event;
        // console.log(value, name);
        this.setState({
            [name]: value
        });
        // console.log(this.state);
    };

    _handleSubmit = event => {
        event.preventDefault();
        console.log(this.state);
        //redux (action) will be here
    };
}

export default Container;