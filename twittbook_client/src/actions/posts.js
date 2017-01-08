import axios from 'axios';
import { browserHistory } from 'react-router';
import {
    FETCH_POSTS,
    POSTED_POST
} from '../constants/action_types';
import queryStringify from '../utils/queryStringify';

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
// https://api.twitter.com/1.1/search/tweets.json
export function fetchTweets() {
    return (dispatch) => {
        const fbAccessToken = localStorage.getItem('fbAccessToken');
        axios.get(`https://api.twitter.com/1.1/search/tweets.json?access_token=${fbAccessToken}`)
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

export function postAPost(status) {
    return (dispatch) => {
        axios.all([postToFacebook(status), tweetToTwitter(status)])
            .then(axios.spread((fbRes, twRes) => {
                fetchPosts();

                console.log(fbRes);
                console.log(twRes);
                dispatch({
                    type: POSTED_POST
                });
            }));
    }
}

export function postAPostWithImage(image, status) {
    return (dispatch) => {
        axios.all([postToFacebookWithImage(image, status), tweetToTwitterWihImage(image, status)])
            .then(axios.spread((fbRes, twRes) => {
                fetchPosts();

                console.log(fbRes);
                console.log(twRes);
                dispatch({
                    type: POSTED_POST
                });
            }));
    }
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