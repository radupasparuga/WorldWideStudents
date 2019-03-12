import axios from 'axios'
import {GET_ERRORS, ALLPOSTS} from './types'

export const handlePost = (contain, username, history) => dispatch => {
  let obj = {post:'', username:''}
  obj.post = contain
  obj.username = username
  axios.post('/api/users/post', obj)
    .then(res => history.push('./dashboard'))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
  
}

export const getPosts = dispatch => {
  axios.get('api/users/postsList')
    .then(res => {
      dispatch({
        type: ALLPOSTS,
        payload: res.data
      })
    })
}