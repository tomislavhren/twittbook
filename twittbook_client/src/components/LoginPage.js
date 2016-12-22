import React, { Component } from 'react';
import '../styles/LoginPage.css';

class LoginPage extends Component {
    render() {
        return (
            <div className="login-page__layout">
                <div className="login-page__container">
                    <div className="login-page__logo">
                        <img src="assets/twitter.svg" alt="twittbook_logo"/>
                        <img src="assets/facebook.svg" alt="twittbook_logo"/>
                    </div>
                </div>
            </div> 
        );
    }
}

export default LoginPage;