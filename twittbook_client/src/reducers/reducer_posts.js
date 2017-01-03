import {
    FETCH_POSTS,
    POSTED_POST
} from '../constants/action_types';

const PostsInitialState = {};
function Posts(state = PostsInitialState, action) {
    switch (action.type) {
        case FETCH_POSTS:
            return { ...state, ...action.posts };
        case POSTED_POST:
            return { ...state };
        default:
            return state
    };
}

export default Posts;