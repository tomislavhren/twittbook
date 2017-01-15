import axios from 'axios';
import { browserHistory } from 'react-router';
import {
    FETCH_POSTS,
    POSTED_POST,
    POSTING_IN_PROGRESS
} from '../constants/action_types';
import queryStringify from '../utils/queryStringify';

const ROOT_URL = 'http://localhost:8080/api';
const FB_ROOT_URL = 'https://graph.facebook.com/v2.8';

export function fetchPosts() {
    return (dispatch) => {
        axios.all([fetchFacebookPosts(), fetchTweets()])
            .then(axios.spread((fb, tw) => {

                let postsByDate = {};
                fb.data.data.forEach((post) => {
                    if (!post.hasOwnProperty('story')) {
                        /** 
                         * Key => Date
                         * Value => Array of posts
                         */
                        const fbPost = {
                            created_time: post.created_time,
                            id: post.id,
                            message: post.message,
                            provider: 'facebook',
                            list_key: `fb_${post.id}`
                        };
                        const date = new Date(post.created_time).toLocaleDateString();
                        if (!postsByDate[date]) Object.assign(postsByDate, { [date]: [] });
                        postsByDate[date].push(fbPost);
                    }
                });

                tw.data.data.forEach((tweet) => {
                    /** 
                     * Key => Date
                     * Value => Array of posts
                     */
                    const twPost = {
                        created_time: tweet.created_at,
                        id: tweet.id_str,
                        message: tweet.text,
                        provider: 'twitter',
                        list_key: `twt_${tweet.id_str}`
                    };
                    const date = new Date(tweet.created_at).toLocaleDateString();
                    if (!postsByDate[date]) Object.assign(postsByDate, { [date]: [] });
                    postsByDate[date].push(twPost);
                });

                dispatch({
                    type: FETCH_POSTS,
                    posts: postsByDate
                });
            }));
    }
}

function fetchFacebookPosts() {
    const fbAccessToken = localStorage.getItem('fbAccessToken');
    return axios.get(`${FB_ROOT_URL}/me/posts?access_token=${fbAccessToken}`);
}

function fetchTweets() {
    return axios.get('/fetchTweets');
}

export function postAPost(status) {
    const req = axios.all([postToFacebook(status), tweetToTwitter(status)]);
    return ({
        type: POSTED_POST,
        payload: req
    });
}

export function postAPostWithImage(image, status, resetForm) {
    const req = axios.all([postToFacebookWithImage(image, status), tweetToTwitterWihImage(image, status)]);
    return ({
        type: POSTED_POST,
        payload: req
    });
}

function postToFacebook(status) {
    const fbAccessToken = localStorage.getItem('fbAccessToken');
    return axios.post(`${FB_ROOT_URL}/me/feed?message=${status}&access_token=${fbAccessToken}`);
}

function postToFacebookWithImage(url, caption) {
    const access_token = localStorage.getItem('fbAccessToken');
    let formData = new FormData();
    formData.append('name', url);
    formData.append('caption', caption);
    return axios.post(`${FB_ROOT_URL}/me/photos?access_token=${access_token}`, formData, { headers: { 'Content-Type': 'multipart/data' } });
}

function tweetToTwitter(status) {
    return axios.post('/send-twitts', queryStringify({ status }));
}

function tweetToTwitterWihImage(url, status) {
    let formData = new FormData();
    formData.append('image', url);
    formData.append('status', status);
    return axios.post('/twitter-status-with-image', formData, { headers: { 'Content-Type': 'multipart/data' } });
}