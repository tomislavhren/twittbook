import axios from 'axios';
import { browserHistory } from 'react-router';
import {
    FETCH_POSTS
} from '../constants/action_types';
import graph from 'fb-react-sdk';

const ROOT_URL = 'http://localhost:8080/api';

export function fetchPosts() {
    return (dispatch) => {
        const fbData = JSON.parse(localStorage.getItem('facebook_data'));
        graph.get('/me/posts', (res) => console.log(res));
        // window.FB.api(
        //     `/${fbData.userID}/posts`,
        //     'GET',
        //     { 'access_token': fbData.accessToken },
        //     function (response) {
        //         const posts = response.data.map(post => Object.assign(post, { provider: 'facebook' }));

        //         dispatch({
        //             type: FETCH_POSTS,
        //             payload: posts
        //         });
        //     }
        // );
    }
}