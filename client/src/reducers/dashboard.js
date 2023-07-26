import {
    DASHBOARD_DEVELOPERS_LOADING,
    DASHBOARD_GET_DEVELOPERS,
    DASHBOARD_GET_MANAGERS,
    DASHBOARD_MANAGERS_LOADING
} from "../actions/actionTypes";

let initialState = {
    developers: [],
    managers: [],
    developersLoading: true,
    managersLoading: true
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case DASHBOARD_GET_DEVELOPERS:
            return {
                ...state,
                developers: payload,
                developersLoading: false
            }
        case DASHBOARD_GET_MANAGERS:
            return {
                ...state,
                managers: payload,
                managersLoading: false
            }
        case DASHBOARD_DEVELOPERS_LOADING:
            return {
                ...state,
                developersLoading: payload,
            }
        case DASHBOARD_MANAGERS_LOADING:
            return {
                ...state,
                managersLoading: payload,
            }
        default:
            return state;
    }
}