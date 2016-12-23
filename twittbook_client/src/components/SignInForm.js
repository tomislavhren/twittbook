import React, { Component } from 'react';
import '../styles/LoginPage.css';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class SignInForm extends Component {
    render() {
        let style = {
            floatingLabel: {
                color: 'white'
            },
            focus: {
                borderBottomColor: 'white'
            },
            loginBtn: {
                color: 'white'
            }
        };

        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <Field
                        name="email"
                        component={TextField}
                        floatingLabelText="Email"
                        underlineFocusStyle={{ ...style.focus }}
                        floatingLabelStyle={{ ...style.floatingLabel }} />

                </div>
                <div>
                    <Field
                        name="password"
                        component={TextField}
                        floatingLabelText="Password"
                        type="password"
                        underlineFocusStyle={{ ...style.focus }}
                        floatingLabelStyle={{ ...style.floatingLabel }} />

                </div>
                <div className="login-page__login-button">
                    <FlatButton
                        type="submit"
                        label="Log in"
                        style={{ ...style.loginBtn }}
                        />
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'LoginForm',
    fields: ['email', 'password']
})(SignInForm);