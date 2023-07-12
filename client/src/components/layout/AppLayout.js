import React from 'react';
import {Outlet, Link, NavLink} from "react-router-dom";
import {Home, Users, LogOut} from "react-feather";

const AppLayout = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                    <div className="position-sticky">
                        <ul className="nav flex-column mb-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">
                                    <Home/>Dashboard
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/users">
                                    <Users/>Users
                                </NavLink>
                            </li>
                        </ul>

                        <hr/>

                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <Link className="nav-link">
                                    <LogOut/>Logout
                                </Link>
                            </li>
                        </ul>

                    </div>
                </nav>

                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AppLayout;