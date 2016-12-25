import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';

const ROOT_URL = 'http://localhost:8080/api';

export function singInUser(credentials) {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/login`, credentials)
            .then(res => {
                // update state with isAuth
                dispatch({ type: AUTH_USER });
                // save token
                localStorage.setItem('token', res.data.token);
                // redirect to home
                browserHistory.push('/home');
            })
            .catch((err) => {
                // error
                dispatch(authError('Bad login info'));
            });
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function signOutUser() {
    // remove token from local storage
    localStorage.removeItem('token');
    browserHistory.push('/');
    return {
        type: UNAUTH_USER
    }
}