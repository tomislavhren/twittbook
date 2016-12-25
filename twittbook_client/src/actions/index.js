import axios from 'axios';
import { browserHistory } from 'react-router';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    AUTH_IN_PROGRESS,
    AUTH_DONE
} from './types';

const ROOT_URL = 'http://localhost:8080/api';

export function singInUser(credentials) {
    return (dispatch) => {
        dispatch(authInProgress(true));
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
                dispatch(authError(err.response.data));
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
    }
}

function authInProgress(isAuthInPromise) {
    return {
        type: isAuthInPromise ? AUTH_IN_PROGRESS : AUTH_DONE
    }
}

function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

