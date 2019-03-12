import { ALLPOSTS } from '../actions/types'

const initialState = {
  allPosts: {}
}

function postsReducer(state = initialState, action ) {
  switch(action.type) {
  case ALLPOSTS:
    return {
      ...state,
      allPosts: action.payload
    }
  default: 
    return state
  }
}

export default postsReducer 