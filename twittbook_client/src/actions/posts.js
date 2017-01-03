import axios from 'axios';
import { browserHistory } from 'react-router';
import {
    FETCH_POSTS,
    POSTED_POST
} from '../constants/action_types';

const ROOT_URL = 'http://localhost:8080/api';
const FB_ROOT_URL = 'https://graph.facebook.com/v2.8';

export function fetchPosts() {
    return (dispatch) => {
        const fbAccessToken = localStorage.getItem('fbAccessToken');
        axios.get(`${FB_ROOT_URL}/me/posts?access_token=${fbAccessToken}`)
            .then(({data: { data}}) => {

                let postsByDate = {};
                data.forEach((post) => {
                    if (!post.hasOwnProperty('story')) {
                        /** 
                         * Key => Date
                         * Value => Array of posts
                         */
                        const date = new Date(post.created_time).toLocaleDateString();
                        Object.assign(post, { provider: 'facebook' });
                        if (!postsByDate[date]) {
                            Object.assign(postsByDate, { [date]: [post] });
                            postsByDate[date].push(post);
                        } else {
                            postsByDate[date].push(post);
                        }
                    }
                });

                dispatch({
                    type: FETCH_POSTS,
                    posts: postsByDate
                });
            });
    }
}

export function postAPost(message) {
    return (dispatch) => {
        const fbAccessToken = localStorage.getItem('fbAccessToken');
        axios.post(`${FB_ROOT_URL}/me/feed?message=${message}&access_token=${fbAccessToken}`)
            .then((res) => {
                fetchPosts();
                dispatch({
                    type: POSTED_POST
                });
            });
    }
}