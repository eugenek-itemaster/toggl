import axios from "axios";
import {
    CLEAR_STATE,
    PROFILE_BLOCKED, PROFILE_CHART_DATA, PROFILE_ENTRIES_LOADED, PROFILE_ENTRIES_LOADING,
    PROFILE_LOADED,
} from "./actionTypes";
import {setAlert} from "./alert";
import {ALERT_ERROR, ROLE_ADMIN, ROLE_DEVELOPER, ROLE_MANAGER} from "../data/constans";
import {faker} from "@faker-js/faker";

export const getProfile = (userId, authUser, startDate, endDate) => async dispatch => {
    try {
        const user = await axios.get(`/api/users/${userId}`);

        if (authUser.role === ROLE_ADMIN || (authUser.role === ROLE_MANAGER && authUser.id === user.data.parent_id) || (authUser.role === ROLE_DEVELOPER && authUser.id === userId)) {
            dispatch({
                type: PROFILE_LOADED,
                payload: user.data
            });

            dispatch(getEntries(userId, startDate, endDate));
        } else {
            dispatch({
                type: PROFILE_BLOCKED,
                payload: true
            });
        }

    } catch (error) {
        dispatch({
            type: PROFILE_LOADED,
            payload: {}
        });
    }
}

export const getEntries = (userId, startDate, endDate) => async dispatch => {
    try {
        dispatch({
            type: PROFILE_ENTRIES_LOADING
        });

        let endpoint = `/api/tracker/entries/${userId}`;

        endpoint += '?' + new URLSearchParams({startDate, endDate});

        const res = await axios.get(endpoint);

        dispatch({
            type: PROFILE_ENTRIES_LOADED,
            payload: res.data
        });

        let labels = [];
        let datasets = [];

        res.data.entries.forEach((item) => {
            labels.push(item.date);
            datasets.push(item.duration);
        });

        let chartData = {
            labels,
            datasets: [
                {
                    label: '',
                    data: datasets,
                    backgroundColor: '#0d6efd',
                }
            ],
        };

        dispatch({
            type: PROFILE_CHART_DATA,
            payload: chartData
        });

    } catch (error) {
        dispatch(setAlert(error, ALERT_ERROR));
    }
}

export const clearState = () => dispatch => {
    dispatch({
        type: CLEAR_STATE
    });
}