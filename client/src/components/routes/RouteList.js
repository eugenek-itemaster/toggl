import React from "react";
import Auth from "../auth/Auth";
import AppLayout from "../layout/AppLayout";
import Dasboard from "../dashboard/Dashboard";
import UserList from "../user/UserList";
import AuthenticatedRouteMiddleware from "../middlewares/AuthenticatedRouteMiddleware";
import PermissionMiddleware from "../middlewares/PermissionMiddleware";
import {ROLE_ADMIN, ROLE_MANAGER} from "../../data/constans";

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
                element: <AuthenticatedRouteMiddleware><Dasboard /></AuthenticatedRouteMiddleware>
            },
            {
                path: "users",
                element: <AuthenticatedRouteMiddleware>
                            <PermissionMiddleware onlyFor={[ROLE_ADMIN, ROLE_MANAGER]} isLink={true}>
                                <UserList/>
                            </PermissionMiddleware>
                         </AuthenticatedRouteMiddleware>
            }
        ]
    },
];

export default RouteList;