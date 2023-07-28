import {LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, USER_LOGOUT} from '../actions/actionTypes';
import UserDto from "../dto/UserDto";

let initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: new UserDto()
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);

            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };
        case LOGIN_FAIL:
        case USER_LOGOUT:
            localStorage.removeItem('token');

            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: new UserDto()
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        default:
            return state;
    }
}