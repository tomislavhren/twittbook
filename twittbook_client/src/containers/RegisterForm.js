import React, { Component } from 'react';
import '../styles/RegisterPage.css';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { registerUser } from '../actions/auth';
import CircularProgress from 'material-ui/CircularProgress';
import { Link } from 'react-router';

class RegisterForm extends Component {
    static contextTypes = {
        router: React.PropTypes.object
    }

    componentWillMount() {
        if (this.props.isAuthenticated) {
            this.context.router.push('/home');
        }
    }

    handleSubmit(formValues) {
        this.props.registerUser(formValues);
    }

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
            <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
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
                <div>
                    <Field
                        name="confirmPassword"
                        component={TextField}
                        floatingLabelText="Confirm password"
                        type="password"
                        underlineFocusStyle={{ ...style.focus }}
                        floatingLabelStyle={{ ...style.floatingLabel }} />
                </div>
                <div className="register-page__error">
                    {this.props.errorMessage ? this.props.errorMessage : ''}
                </div>
                <div className="register-page__login-button">
                    <FlatButton
                        type="submit"
                        label="Sign up"
                        icon={this.props.authInProgress ? <CircularProgress size={24} /> : ''}
                        style={{ ...style.loginBtn }}
                        />
                </div>
            </form>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

function validate(values) {
    const errors = {};
    if (values.password !== values.confirmPassword)
        errors.confirmPassword = 'Passwords doesn\'t match';

    return errors;
}

export default connect(mapStateToProps, { registerUser })(reduxForm({
    form: 'RegisterForm',
    fields: ['email', 'password', 'confirmPassword'],
    validate: validate
})(RegisterForm));