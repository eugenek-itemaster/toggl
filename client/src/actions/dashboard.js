import axios from "axios";
import {DASHBOARD_GET_DEVELOPERS} from "./actionTypes";
import {ROLE_ADMIN, ROLE_DEVELOPER} from "../data/constans";

export const getDevelopers = (start_date, end_date) => async dispatch => {
    try {
        dispatch({
            type: DASHBOARD_GET_DEVELOPERS,
            payload: []
        });

        let endpoint = '/api/tracker/developers';

        endpoint += '?' + new URLSearchParams({start_date, end_date});

        const res = await axios.get(endpoint);

        dispatch({
            type: DASHBOARD_GET_DEVELOPERS,
            payload: res.data
        });
    } catch (error) {

    }
}
