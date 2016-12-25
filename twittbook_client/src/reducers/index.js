import { combineReducers } from 'redux';
import postsReducer from './reducer_posts';
import { reducer as formReducer } from 'redux-form';
import authReducer from './reducer_auth';

const rootReducer = combineReducers({
    posts: postsReducer,
    form: formReducer,
    auth: authReducer
});

export default rootReducer;