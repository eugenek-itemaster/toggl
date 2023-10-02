import {LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, USER_LOGOUT} from "./actionTypes";
import axios from "axios";
import authToken from "../utils/authToken";
import {setAlert} from "./alert";
import {ALERT_ERROR} from "../data/constans";

export const login = (email, password, source) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password, source });

    try {
        const res = await axios.post('/api/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (error) {
        dispatch(setAlert(error.response.data.message, ALERT_ERROR));

        dispatch({
            type: LOGIN_FAIL,
        });
    }
}

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        authToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL
        });
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: USER_LOGOUT
    });
}