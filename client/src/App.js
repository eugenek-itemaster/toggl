import {React, useEffect} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './assets/css/App.css';
import RouteList from "./components/routes/RouteList";
/* REDUX */
import {Provider} from "react-redux";
import store from "./store";
import authToken from "./utils/authToken";
import {loadUser} from "./actions/auth";

const router = createBrowserRouter(RouteList);

if (localStorage.token) {
    authToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    )
}

export default App;
