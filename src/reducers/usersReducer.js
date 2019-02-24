import { USERS } from '../actions/types'

const initialState = {
  users: {}
}

function usersReducer(state = initialState, action ) {
  switch(action.type) {
  case USERS:
    return {
      ...state,
      users: action.payload
    }
  default: 
    return state
  }
}

export default usersReducer 