import {
    USER_POPUP,
    GET_USERS,
    EDIT_USER,
    STORE_USER,
    UPDATE_USER,
    DELETE_USER
} from "../actions/actionTypes";
import UserDto from "../dto/UserDto";

let initialState = {
    users: [],
    user: new UserDto(),
    loading: true,
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
                userPopup: false,
                user: new UserDto()
            }
        case UPDATE_USER:
            return {
                ...state,
                userPopup: false,
                user: new UserDto()
            }
        case DELETE_USER:
            return {
                ...state,
                userPopup: false,
                user: new UserDto()
            }
        default:
            return state;
    }
}