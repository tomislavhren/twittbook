import React, { Component } from 'react';
import '../styles/LoginPage.css';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SignInForm from '../components/SignInForm';
import { singInUser } from '../actions/index';

class LoginPage extends Component {
    handleSubmit(formValues) {
        this.props.singInUser(formValues);
    }

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
                        {/*
                        <FacebookLogin
                            appId="1759502397705552"
                            autoLoad={true}
                            fields="name,email,picture"
                            callback={this.responseFacebook}
                            cssClass="my-facebook-button-class"
                            icon="fa-facebook"
                            />
                        */}
                        <SignInForm onSubmit={this.handleSubmit.bind(this)} />
                    </div>
                </div>
            </div >
        );
    }
}

export default connect(null, { singInUser })(LoginPage);