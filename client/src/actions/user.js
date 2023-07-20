import axios from "axios";
import {
    USER_POPUP,
    GET_USERS,
    EDIT_USER,
    STORE_USER,
    UPDATE_USER,
    CLEAR_USER_ALERTS,
    DELETE_USER,
    ERROR_USER_SAVE
} from "./actionTypes";

export const getUsers = () => async dispatch => {
    try {
        const res = await axios.get('/api/users');

        dispatch({
            type: GET_USERS,
            payload: res.data
        });
    } catch (error) {
        //dispatch(setAlert(error.response.data.message, 'danger'));
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
        const res = await axios.post('/api/users', body, config);

        dispatch({
            type: STORE_USER,
            payload: `User ${user.name} created`
        });

        dispatch(getUsers());
    } catch (error) {
        dispatch({
            type: ERROR_USER_SAVE,
            payload: error.response.data.errors[0].msg
        });
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
        const res = await axios.put(`/api/users/${user._id}`, body, config);

        dispatch({
            type: UPDATE_USER,
            payload: `User ${user.name} updated`
        });

        dispatch(getUsers());
    } catch (error) {
        dispatch({
            type: ERROR_USER_SAVE,
            payload: error.response.data.errors[0].msg
        });
    }
}

export const deleteUser = (user) => async dispatch => {
    try {
        const res = await axios.delete(`/api/users/${user._id}`);

        dispatch({
            type: DELETE_USER,
            payload: `User ${user.name} deleted`
        });

        dispatch(getUsers());
    } catch (error) {

    }
}

export const clearAlerts = () => dispatch => {
    dispatch({
        type: CLEAR_USER_ALERTS
    });
}
