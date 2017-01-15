import React, { Component } from 'react';
import '../styles/RegisterPage.css';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import RegisterForm from '../containers/RegisterForm';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class RegisterPage extends Component {
    render() {

        const { handleSubmit } = this.props;

        return (
            <div className="register-page__layout">
                <div className="register-page__container">
                    <div className="register-page__logo">
                        <img src="assets/twitter.svg" alt="twittbook_logo" />
                        <img src="assets/facebook.svg" alt="twittbook_logo" />
                    </div>
                    <div className="register-page__form">
                        <RegisterForm />
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterPage;