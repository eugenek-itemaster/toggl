import React from "react";
import Auth from "../auth/Auth";
import AppLayout from "../layout/AppLayout";
import Dasboard from "../dashboard/Dashboard";
import UserList from "../user/UserList";
import RequireAuthRoute from "./RequireAuthRoute";

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
                element: <RequireAuthRoute><Dasboard /></RequireAuthRoute>
            },
            {
                path: "users",
                element: <RequireAuthRoute><UserList/></RequireAuthRoute>
            }
        ]
    },
];

export default RouteList;