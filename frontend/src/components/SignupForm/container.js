import React, { Component } from "react";
import PropTypes from "prop-types";
import SignupForm from "./presenter";

// const Container = props => <SignupForm {...props} />;

class Container extends Component {
    state = {
        email: "",
        name: "",
        username: "",
        password: "",
    };

    static propTypes = {
        facebookLogin: PropTypes.func.isRequired,
        createAccount: PropTypes.func.isRequired
    };

    render () {
        const { email, name, username, password } = this.state;
        return (
            <SignupForm
                handleInputChange={this._handleInputChange}
                handleSubmit={this._handleSubmit}
                emailValue={email}
                handleFacebookLogin={this._handleFacebookLogin} 
                nameValue={name}
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
        const { email, name, password, username } = this.state;
        const { createAccount } = this.props;

        event.preventDefault();

        createAccount(username, password, email, name);
        // console.log(this.state);
        //redux (action) will be here
    };

    _handleFacebookLogin = response => {
        // console.log(response);
        const { facebookLogin } = this.props;
        facebookLogin(response.accessToken);
    };
}

export default Container;
