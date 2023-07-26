import React from "react";
import Auth from "../auth/Auth";
import AppLayout from "../layout/AppLayout";
import Dasboard from "../dashboard/Dashboard";
import UserList from "../user/UserList";
import AuthenticatedRouteMiddleware from "../middlewares/AuthenticatedRouteMiddleware";
import PermissionMiddleware from "../middlewares/PermissionMiddleware";
import {ROLE_ADMIN, ROLE_MANAGER} from "../../data/constans";
import Profile from "../profile/Profile";
import NotFound from "../layout/NotFound";

const RouteList = [
    {
        path: "/login",
        element: <Auth />
    },
    {
        path: "/",
        element: <AuthenticatedRouteMiddleware><AppLayout /></AuthenticatedRouteMiddleware>,
        children: [
            {
                path: "",
                element:    <Dasboard />
            },
            {
                path: "users",
                element:    <PermissionMiddleware onlyFor={[ROLE_ADMIN, ROLE_MANAGER]} isLink={true}>
                                <UserList/>
                            </PermissionMiddleware>

            },
            {
                path: "users/:userId",
                element:    <Profile/>

            }
        ]
    },
    {
        path: "*",
        element: <AuthenticatedRouteMiddleware><NotFound/></AuthenticatedRouteMiddleware>
    }
];

export default RouteList;