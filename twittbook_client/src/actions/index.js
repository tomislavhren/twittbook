import axios from 'axios';
import { browserHistory } from 'react-router';

export const SING_IN = 'SIGN_IN';

const ROOT_URL = 'http://localhost:8080/api';

export function singInUser(credentials) {
    return (dispatch) => {
        // const req = 
        axios.post(`${ROOT_URL}/login`, credentials)
            .then(res => {
                console.log(res);
                browserHistory.push('/home');
            })
            .catch((err) => {
                console.error(err);
            });

        // dispatch({
        //     type: SING_IN,
        //     payload: req
        // });
    }
}