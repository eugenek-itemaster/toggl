import {DASHBOARD_GET_DEVELOPERS, DASHBOARD_GET_MANAGERS} from "../actions/actionTypes";

let initialState = {
    developers: [],
    managers: [],
    loadingDevelopers: true,
    loadingManagers: true
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case DASHBOARD_GET_DEVELOPERS:
            return {
                ...state,
                developers: payload,
                loadingDevelopers: false
            }
        case DASHBOARD_GET_MANAGERS:
            return {
                ...state,
                managers: payload,
                loadingManagers: false
            }
        default:
            return state;
    }
}