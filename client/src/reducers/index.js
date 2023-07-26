import {combineReducers} from "redux";
import auth from "./auth";
import user from "./user";
import dashboard from "./dashboard";
import alert from "./alert";

export default combineReducers({
    auth,
    user,
    dashboard,
    alert
});