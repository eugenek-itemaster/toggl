import {LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, USER_LOGOUT} from "./actionTypes";
import axios from "axios";
import authToken from "../utils/authToken";

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (error) {
        //dispatch(setAlert(error.response.data.message, 'danger'));

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