import { USERPROFILE } from '../actions/types';

const initialState = {
    userData: {}
}

function userProfileReducer(state = initialState, action ) {
    switch(action.type) {
        case USERPROFILE:
            return {
                ...state,
                userData: action.payload
            }
        default: 
            return state;
    }
}

export default userProfileReducer; 