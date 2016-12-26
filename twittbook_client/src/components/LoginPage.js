import React, { Component } from 'react';
import '../styles/LoginPage.css';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SignInForm from '../containers/SignInForm';

class LoginPage extends Component {
    render() {

        const { handleSubmit } = this.props;

        return (
            <div className="login-page__layout">
                <div className="login-page__container">
                    <div className="login-page__logo">
                        <img src="assets/twitter.svg" alt="twittbook_logo" />
                        <img src="assets/facebook.svg" alt="twittbook_logo" />
                    </div>
                    <div className="login-page__form">
                        <SignInForm />
                    </div>
                </div>
            </div >
        );
    }
}

export default LoginPage;