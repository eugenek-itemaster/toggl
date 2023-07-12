import React from "react";
import Auth from "../auth/Auth";
import AppLayout from "../layout/AppLayout";
import Dasboard from "../dashboard/Dashboard";
import UserList from "../user/UserList";

const RouteList = [
    {
        path: "/login",
        element: <Auth />
    },
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "",
                element: <Dasboard />
            },
            {
                path: "users",
                element: <UserList/>
            }
        ]
    },
];

export default RouteList;