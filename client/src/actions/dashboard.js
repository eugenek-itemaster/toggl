import axios from "axios";
import {
    DASHBOARD_DEVELOPERS_LOADING,
    DASHBOARD_GET_DEVELOPERS,
    DASHBOARD_GET_MANAGERS,
    DASHBOARD_MANAGERS_LOADING
} from "./actionTypes";
import {setAlert} from "./alert";
import {ALERT_ERROR, ALERT_SUCCESS} from "../data/constans";

export const getDevelopers = (start_date, end_date) => async dispatch => {
    try {
        dispatch({
            type: DASHBOARD_DEVELOPERS_LOADING,
            payload: true
        });

        let endpoint = '/api/tracker/developers';

        endpoint += '?' + new URLSearchParams({start_date, end_date});

        const res = await axios.get(endpoint);

        dispatch({
            type: DASHBOARD_GET_DEVELOPERS,
            payload: res.data
        });
    } catch (error) {
        dispatch(setAlert(error, ALERT_ERROR));
    }
}

export const getManagers = (start_date, end_date) => async dispatch => {
    try {
        dispatch({
            type: DASHBOARD_MANAGERS_LOADING,
            payload: true
        });

        const res = await axios.get('/api/tracker/managers');

        dispatch({
            type: DASHBOARD_GET_MANAGERS,
            payload: res.data
        });
    } catch (error) {
        dispatch(setAlert(error, ALERT_ERROR));
    }
}

export const stopTracker = (userId, startDate, endDate) => async dispatch => {
    dispatch({
        type: DASHBOARD_DEVELOPERS_LOADING,
        payload: true
    });

    try {
        await axios.get(`/api/tracker/stop/${userId}`);

        dispatch(setAlert('Tracker stopped', ALERT_SUCCESS));

        dispatch(getDevelopers(startDate, endDate));
    } catch (error) {
        dispatch(setAlert(error.response.data, ALERT_ERROR));

        dispatch({
            type: DASHBOARD_DEVELOPERS_LOADING,
            payload: false
        });
    }
}
