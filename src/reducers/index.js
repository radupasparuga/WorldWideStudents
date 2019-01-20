import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import usersReducer from './usersReducer';
import userProfileReducer from './userProfileReducer';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    users: usersReducer,
    userData: userProfileReducer
});