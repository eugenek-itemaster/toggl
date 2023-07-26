import React, {Component} from 'react';
import {connect} from 'react-redux';
import DashboardDevelopers from "./DashboardDevelopers";
import PermissionMiddleware from "../middlewares/PermissionMiddleware";
import DashboardManagers from "./DashboardManagers";

function mapStateToProps(state) {
    return {};
}

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
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Dashboard);