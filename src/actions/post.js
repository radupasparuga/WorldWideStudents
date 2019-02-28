import axios from 'axios'
import {GET_ERRORS} from './types'

export const handlePost = (contain, username) => dispatch => {
  let obj = {post:'', username:''}
  obj.post = contain
  obj.username = username
  console.log(obj.username)
  axios.post('/api/users/post', obj)
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}