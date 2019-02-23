import axios from 'axios';
import {GET_ERRORS, POST} from './types'

export const handlePost = (post) => dispatch => {
	axios.post('/api/users/post', post)
		.then(res => {
			dispatch({
				type: POST,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
}