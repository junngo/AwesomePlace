import React, { Component } from "react";
import PropTypes from "prop-types";
import LoginFrom from "./presenter";

// const Container = props => <LoginFrom {...props} />;

class Container extends Component {
    state = {
        username: "",
        password: ""
    };

    static propTypes = {
        facebookLogin: PropTypes.func.isRequired,
        usernameLogin: PropTypes.func.isRequired
    };

    render() {
        const { username, password } = this.state;
        return (
            <LoginFrom 
                handleInputChange={this._handleInputChange} 
                handleSubmit={this._handleSubmit}
                handleFacebookLogin={this._handleFacebookLogin}
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
        const { usernameLogin } = this.props;
        const { username, password } = this.state;

        event.preventDefault();

        usernameLogin(username, password);

        console.log(this.state);
        //redux (action) will be here
    };

    _handleFacebookLogin = response => {
        // console.log(response);
        const { facebookLogin } = this.props;
        facebookLogin(response.accessToken);
    };
}

export default Container;