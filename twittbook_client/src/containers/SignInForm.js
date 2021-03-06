import React, { Component } from 'react';
import '../styles/LoginPage.css';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { singInUser } from '../actions/auth';
import CircularProgress from 'material-ui/CircularProgress';
import { Link } from 'react-router';

class SignInForm extends Component {
    static contextTypes = {
        router: React.PropTypes.object
    }

    componentWillMount() {
        if (this.props.isAuthenticated) {
            this.context.router.push('/home');
        }
    }

    handleSubmit(formValues) {
        this.props.singInUser(formValues);
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
                <div className="login-page__error">
                    {this.props.errorMessage ? this.props.errorMessage : ''}
                </div>
                <div className="login-page__actions">
                    <FlatButton
                        type="submit"
                        label="Sign in"
                        icon={this.props.authInProgress ? <CircularProgress size={24} /> : ''}
                        style={{ ...style.loginBtn }}
                        />
                    <FlatButton
                        containerElement={<Link to="/register" />}
                        label="Register"
                        style={{ ...style.loginBtn }}
                        />
                </div>
            </form>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        errorMessage: state.auth.error ? state.auth.error.message : '',
        authInProgress: state.auth.authInProgress,
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, { singInUser })(reduxForm({
    form: 'LoginForm',
    fields: ['email', 'password']
})(SignInForm));