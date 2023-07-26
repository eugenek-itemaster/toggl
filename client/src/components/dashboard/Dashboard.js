import React, {Component} from 'react';
import {connect} from 'react-redux';
import DashboardDevelopers from "./DashboardDevelopers";
import PermissionMiddleware from "../middlewares/PermissionMiddleware";

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
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Dashboard);