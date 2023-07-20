import {
    USER_POPUP,
    GET_USERS,
    EDIT_USER,
    STORE_USER,
    UPDATE_USER,
    CLEAR_USER_ALERTS,
    DELETE_USER, ERROR_USER_SAVE
} from "../actions/actionTypes";
import UserDto from "../dto/UserDto";

let initialState = {
    users: [],
    user: new UserDto(),
    loading: true,
    success: false,
    error: false,
    userPopup: false
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_USERS:
            return {
                ...state,
                users: payload,
                loading: false
            }
        case USER_POPUP:
            return {
                ...state,
                userPopup: payload,
                user: new UserDto()
            }
        case EDIT_USER:
            return {
                ...state,
                user: new UserDto(payload),
                userPopup: true
            }
        case STORE_USER:
            return {
                ...state,
                success: payload,
                userPopup: false,
                user: new UserDto()
            }
        case UPDATE_USER:
            return {
                ...state,
                success: payload,
                userPopup: false,
                user: new UserDto()
            }
        case DELETE_USER:
            return {
                ...state,
                success: payload,
                userPopup: false,
                user: new UserDto()
            }
        case CLEAR_USER_ALERTS:
            return {
                ...state,
                success: false,
                error: false
            }
        case ERROR_USER_SAVE:
            return {
                ...state,
                error: payload
            }
        default:
            return state;
    }
}