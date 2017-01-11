import { combineReducers } from 'redux';
import postsReducer from './reducer_posts';
import { reducer as formReducer } from 'redux-form';
import authReducer from './reducer_auth';
import { POSTED_POST } from '../constants/action_types';

const rootReducer = combineReducers({
    posts: postsReducer,
    form: formReducer.plugin({
        NewPostForm: (state, action) => {
            switch (action.type) {
                case POSTED_POST:
                    return undefined;
                default:
                    return state;
            }
        }
    }),
    auth: authReducer
});

export default rootReducer;