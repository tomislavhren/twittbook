import axios from 'axios';
import { browserHistory } from 'react-router';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    AUTH_IN_PROGRESS,
    AUTH_DONE,
    UPDATE_FACEBOOK_ACCOUNT
} from '../constants/action_types';

const ROOT_URL = 'http://localhost:8080/api';

export function singInUser(credentials) {
    return (dispatch) => {
        dispatch(authInProgress(true));
        axios.post(`${ROOT_URL}/login`, credentials)
            .then(res => {
                // update state with isAuth
                dispatch({ type: AUTH_USER, payload: res.data });
                // save token
                localStorage.setItem('token', res.data.token);
                // redirect to home
                browserHistory.push('/home');
            })
            .catch((err) => {
                // error
                if (!err.response) {
                    dispatch(authError({
                        message: 'Login is temporarily unavailable. Please try again later.'
                    }));
                } else {
                    dispatch(authError(err.response.data));
                }
            })
            .then(() => {
                dispatch(authInProgress(false));
            });
    }
}

export function signOutUser() {
    // remove token from local storage
    localStorage.removeItem('token');
    browserHistory.push('/');
    return {
        type: UNAUTH_USER
    };
}

export function addFacebookAccount(data) {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        const { email, facebook_data } = data;
        axios.post(`${ROOT_URL}/add-FB-account`, { email, facebook_data, token })
            .then(res => {
                // update state with isAuth
                dispatch({ type: UPDATE_FACEBOOK_ACCOUNT, user: res.data.user });
            })
            .catch((err) => {
                // error
                console.log(err);
            });
    };
}

function authInProgress(isAuthInProgress) {
    return {
        type: isAuthInProgress ? AUTH_IN_PROGRESS : AUTH_DONE
    }
}

function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

