import React, {Component} from 'react';
import {connect} from 'react-redux';
import DashboardDevelopers from "./DashboardDevelopers";
import PermissionMiddleware from "../middlewares/PermissionMiddleware";
import DashboardManagers from "./DashboardManagers";
import Profile from "../profile/Profile";

class Dashboard extends Component {
    render() {
        return (
            <div>
                <h1 className="h2">Dashboard</h1>
                <div className="row">
                    <PermissionMiddleware onlyFor={['admin', 'manager']}>
                        <div className="col-md-6">
                            <DashboardDevelopers></DashboardDevelopers>
                        </div>
                    </PermissionMiddleware>
                    <PermissionMiddleware onlyFor={['admin']}>
                        <div className="col-md-6">
                            <DashboardManagers></DashboardManagers>
                        </div>
                    </PermissionMiddleware>
                    <PermissionMiddleware onlyFor={['developer']}>
                        <div className="col-md-12">
                            <Profile userId={this.props.authUser.id ?? 0}/>
                        </div>
                    </PermissionMiddleware>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    authUser: state.auth.user
})

export default connect(
    mapStateToProps,
)(Dashboard);