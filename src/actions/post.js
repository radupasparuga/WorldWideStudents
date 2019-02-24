import axios from 'axios';
import {GET_ERRORS} from './types'

export const handlePost = (contain) => dispatch => {
	let obj = {post:''}
	obj.post = contain
	axios.post('/api/users/post', obj)
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
}