import React from 'react';
import {Outlet, Link, NavLink} from "react-router-dom";
import {Home, Users, LogOut} from "react-feather";
import {logout} from "../../actions/auth";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import PermissionMiddleware from "../middlewares/PermissionMiddleware";
import {ROLE_ADMIN, ROLE_MANAGER} from "../../data/constans";
import Alert from "./Alert";

const AppLayout = ({auth, logout}) => {
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
                            <PermissionMiddleware onlyFor={[ROLE_ADMIN, ROLE_MANAGER]}>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/users">
                                        <Users/>Users
                                    </NavLink>
                                </li>
                            </PermissionMiddleware>
                        </ul>

                        <hr/>

                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <Link className="nav-link" onClick={logout}>
                                    <LogOut/>Logout
                                </Link>
                            </li>
                        </ul>

                    </div>
                </nav>

                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <Outlet />
                    <Alert></Alert>
                </main>
            </div>
        </div>
    );
}

AppLayout.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logout})(AppLayout);