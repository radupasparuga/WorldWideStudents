import { USERNAME } from '../actions/types';

const initialState = {
    username: ''
}

function usernameReducer(state = initialState, action ) {
    switch(action.type) {
        case USERNAME:
            return {
                ...state,
                username: action.payload
            }
        default: 
            return state;
    }
}

export default usernameReducer; 