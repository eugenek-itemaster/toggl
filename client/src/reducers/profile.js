import UserDto from "../dto/UserDto";
import {PROFILE_BLOCKED, PROFILE_LOADED} from "../actions/actionTypes";

let initialState = {
    user: new UserDto(),
    loading: true,
    blocked: false
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case PROFILE_LOADED:
            return {
                ...state,
                user: payload,
                loading: false
            }
        case PROFILE_BLOCKED:
            return {
                ...state,
                blocked: payload,
                loading: false
            }
        default:
            return state;
    }
}