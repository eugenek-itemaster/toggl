import axios from "axios";
import {PROFILE_BLOCKED, PROFILE_LOADED, PROFILE_LOADING} from "./actionTypes";
import {setAlert} from "./alert";
import {ALERT_ERROR, ROLE_ADMIN} from "../data/constans";

export const getProfile = (userId, authUser) => async dispatch => {
    try {
        const user = await axios.get(`/api/users/${userId}`);

        if (authUser.role !== ROLE_ADMIN && authUser._id !== user.data.parent_id) {
            dispatch({
                type: PROFILE_BLOCKED,
                payload: true
            });
        } else {
            dispatch({
                type: PROFILE_LOADED,
                payload: user.data
            });
        }

    } catch (error) {
        dispatch({
            type: PROFILE_LOADED,
            payload: {}
        });
    }
}