import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    AUTH_IN_PROGRESS,
    AUTH_DONE,
    UPDATE_FACEBOOK_ACCOUNT
} from '../constants/action_types';

const AuthInitialState = {}
const Auth = (state = AuthInitialState, action) => {
    switch (action.type) {
        case AUTH_USER:
            const {
                user = null,
                token = "",
                isAuthenticated = true
            } = action.payload ? action.payload : {};

            if (token && user)
                return {
                    ...state,
                    isAuthenticated,
                    user,
                    token
                };
            else
                return {
                    ...state,
                    isAuthenticated
                };
        case UNAUTH_USER:
            return { ...state, isAuthenticated: false };
        case AUTH_ERROR:
            return { ...state, error: action.payload };
        case AUTH_IN_PROGRESS:
            return { ...state, authInProgress: true };
        case AUTH_DONE:
            return { ...state, authInProgress: false };
        case UPDATE_FACEBOOK_ACCOUNT:
            return { ...state, user: action.user }
        default:
            return state;
    }
}

export default Auth;