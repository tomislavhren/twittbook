import React, { Component } from 'react';
import '../styles/LoginPage.css';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';

class LoginPage extends Component {
    responseFacebook(response) {
        console.log(response);
    }

    render() {
        return (
            <div className="login-page__layout">
                <div className="login-page__container">
                    <div className="login-page__logo">
                        <img src="assets/twitter.svg" alt="twittbook_logo" />
                        <img src="assets/facebook.svg" alt="twittbook_logo" />
                    </div>
                    <div>
                        <FacebookLogin
                            appId="1759502397705552"
                            autoLoad={true}
                            fields="name,email,picture"
                            callback={this.responseFacebook}
                            cssClass="my-facebook-button-class"
                            icon="fa-facebook"
                            />
                    </div>
                </div>
            </div >
        );
    }
}

export default LoginPage;