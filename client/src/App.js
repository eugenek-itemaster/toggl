import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './assets/css/App.css';
import RouteList from "./components/routes/RouteList";
/* REDUX */
import {Provider} from "react-redux";
import store from "./store";

const router = createBrowserRouter(RouteList);

const App = () => (
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
)

export default App;
