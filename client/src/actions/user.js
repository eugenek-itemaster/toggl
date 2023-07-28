import axios from "axios";
import {
    USER_POPUP,
    GET_USERS,
    EDIT_USER,
    STORE_USER,
    UPDATE_USER,
    DELETE_USER,
} from "./actionTypes";
import {setAlert} from "./alert";
import {ALERT_ERROR, ALERT_SUCCESS} from "../data/constans";

export const getUsers = () => async dispatch => {
    try {
        const res = await axios.get('/api/users');

        dispatch({
            type: GET_USERS,
            payload: res.data
        });
    } catch (error) {
        dispatch(setAlert(error, ALERT_ERROR));
    }
}

export const createUser = (show = true) => dispatch => {
    dispatch({
        type: USER_POPUP,
        payload: show,
    });
}

export const editUser = (user) => dispatch => {
    dispatch({
        type: EDIT_USER,
        payload: user
    });
}

export const storeUser = (user) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify(user);

    try {
        await axios.post('/api/users', body, config);

        dispatch({
            type: STORE_USER,
            payload: `User ${user.name} created`
        });

        dispatch(setAlert(`User ${user.name} created`, ALERT_SUCCESS));

        dispatch(getUsers());
    } catch (error) {
        dispatch(setAlert(error.response.data.errors[0].msg, ALERT_ERROR));
    }
}

export const updateUser = (id, user) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify(user);

    try {
        await axios.put(`/api/users/${user._id}`, body, config);

        dispatch({
            type: UPDATE_USER,
            payload: `User ${user.name} updated`
        });

        dispatch(setAlert(`User ${user.name} updated`, ALERT_SUCCESS));

        dispatch(getUsers());
    } catch (error) {
        dispatch(setAlert(error.response.data.errors[0].msg, ALERT_ERROR));
    }
}

export const deleteUser = (user) => async dispatch => {
    try {
        await axios.delete(`/api/users/${user._id}`);

        dispatch({
            type: DELETE_USER,
            payload: `User ${user.name} deleted`
        });

        dispatch(setAlert(`User ${user.name} deleted`, ALERT_SUCCESS));

        dispatch(getUsers());
    } catch (error) {
        dispatch(setAlert(error.response.data.errors[0].msg, ALERT_ERROR));
    }
}
