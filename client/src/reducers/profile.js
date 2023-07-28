import UserDto from "../dto/UserDto";
import {
    CLEAR_STATE,
    PROFILE_BLOCKED, PROFILE_CHART_DATA,
    PROFILE_ENTRIES_LOADED,
    PROFILE_ENTRIES_LOADING,
    PROFILE_LOADED,
    PROFILE_LOADING
} from "../actions/actionTypes";
import dayjs from "dayjs";

let initialState = {
    user: new UserDto(),
    loading: true,
    blocked: false,
    entries: [],
    startDate: dayjs().format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
    loadingData: true,
    chartData: {
        labels: [],
        datasets: []
    },
    totalDuration: null
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
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case PROFILE_ENTRIES_LOADING:
            return {
                ...state,
                loadingData: true
            }
        case PROFILE_ENTRIES_LOADED:
            return {
                ...state,
                entries: payload.entries,
                totalDuration: payload.totalDuration,
                loadingData: false
            }
        case CLEAR_STATE:
            return {
                ...state,
                entries: [],
                totalDuration: null,
                loadingData: true,
                loading: true,
                startDate: dayjs().format('YYYY-MM-DD'),
                endDate: dayjs().format('YYYY-MM-DD'),
            }
        case PROFILE_CHART_DATA:
            return {
                ...state,
                chartData: payload
            }
        default:
            return state;
    }
}