import axios from 'axios'
import {GET_ERRORS} from './types'

export const handlePost = (contain, username) => dispatch => {
  let obj = {post:'', username:''}
  obj.post = contain
  obj.username = username
  axios.post('/api/users/post', obj)
  /* TODO ERROR HANDLER */
}