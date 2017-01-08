import axios from 'axios';
import { browserHistory } from 'react-router';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    AUTH_IN_PROGRESS,
    AUTH_DONE,
    UPDATE_FACEBOOK_ACCOUNT,
    USER_DATA,
    TWITTER_AUTH_TOKEN,
    TWITTER_AUTH_SUCCESS
} from '../constants/action_types';
import queryStringify from '../utils/queryStringify';

axios.defaults.baseURL = 'http://localhost:8080/api';
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers['x-access-token'] = localStorage.getItem('token');

export function singInUser({email, password}) {
    return (dispatch) => {
        dispatch(authInProgress(true));
        axios.post(`/login`, queryStringify({ email, password }))
            .then(res => {
                // update state with isAuth
                dispatch({ type: USER_DATA, user: res.data.user });
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
        axios.post(`/add-FB-account2`, queryStringify({ email: email, facebook_data: facebook_data }))
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

export function getUserData() {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        axios.get(`/getUserData`)
            .then(res => {
                // update state with isAuth
                dispatch({ type: USER_DATA, user: res.data.user });
            })
            .catch((err) => {
                // error
                console.log(err);
            });
    };
}

export function obtainTwitterToken() {
    return (dispatch) => {
        axios.get(`/login-twitter`)
            .then(res => {
                const tw_auth_token = res.data
                dispatch({
                    type: TWITTER_AUTH_TOKEN,
                    tw_auth_token
                });
                window.open(`https://api.twitter.com/oauth/authorize?oauth_token=${tw_auth_token.oauth_token}`, '_blank', 'width=700,height=850');
            })
            .catch(err => {
                console.log(err)
            });
    }
}

export function verifyTwitter({oauth_token, oauth_token_secret, oauth_verifier}) {
    return (dispatch) => {
        const config = {
            headers: {
                oauth_token,
                oauth_token_secret,
                oauth_verifier
            }
        };

        axios.get('/twitter-verify', config)
            .then((res) => {
                console.log(res.data);
                dispatch({ type: TWITTER_AUTH_SUCCESS, user: res.data.user })
            });
    }
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

