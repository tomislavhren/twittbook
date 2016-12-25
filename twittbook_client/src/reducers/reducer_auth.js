import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    AUTH_IN_PROGRESS,
    AUTH_DONE
} from '../actions/types';

const AuthInitialState = {}
const Auth = (state = AuthInitialState, action) => {
    switch (action.type) {
        case AUTH_USER:
            return { ...state, isAuthenticated: true };
        case UNAUTH_USER:
            return { ...state, isAuthenticated: false };
        case AUTH_ERROR:
            return { ...state, error: action.payload };
        case AUTH_IN_PROGRESS:
            return { ...state, authInProgress: true };
        case AUTH_DONE:
            return { ...state, authInProgress: false };
        default:
            return state
    }
}

export default Auth;