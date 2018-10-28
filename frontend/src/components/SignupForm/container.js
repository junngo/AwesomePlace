import React, { Component } from "react";
import PropTypes from "prop-types";
import SignupForm from "./presenter";

// const Container = props => <SignupForm {...props} />;

class Container extends Component {
    state = {
        email: "",
        fullname: "",
        username: "",
        password: "",
    };

    static propTypes = {
        facebookLogin: PropTypes.func.isRequired
    };

    render () {
        const { email, fullname, username, password } = this.state;
        return (
            <SignupForm
                handleInputChange={this._handleInputChange}
                handleSubmit={this._handleSubmit}
                emailValue={email}
                handleFacebookLogin={this._handleFacebookLogin} 
                fullnameValue={fullname}
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
