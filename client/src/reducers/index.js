import {combineReducers} from "redux";
import auth from "./auth";
import user from "./user";
import dashboard from "./dashboard";
import alert from "./alert";
import profile from "./profile";
import {USER_LOGOUT} from "../actions/actionTypes";

const appReducer = combineReducers({
    auth,
    user,
    dashboard,
    alert,
    profile
});

export default (state, action) => {
    if (action.type === USER_LOGOUT) {
        state = undefined;
    }

    return appReducer(state, action);
};
/*export default combineReducers({
    auth,
    user,
    dashboard,
    alert,
    profile
});*/