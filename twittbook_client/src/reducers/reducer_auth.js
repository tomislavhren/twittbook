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
        case UPDATE_FACEBOOK_ACCOUNT:
            return { ...state, user: action.user };
        case USER_DATA:
            return { ...state, user: action.user };
        case TWITTER_AUTH_TOKEN:
            return { ...state, tw_auth_token: action.tw_auth_token };
        case TWITTER_AUTH_SUCCESS:
            return { ...state, user: action.user }
        default:
            return state;
    }
}

export default Auth;