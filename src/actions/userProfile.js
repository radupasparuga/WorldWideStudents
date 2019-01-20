import axios from 'axios';
import { USERPROFILE } from './types';

export const userProfile = (username) => dispatch => {
    axios.get('/api/users/' + username)
            .then(res =>{
                dispatch({
                    type: USERPROFILE,
                    payload: res.data
                });
            })
            .catch(err => {
                console.log(err)
            });
}