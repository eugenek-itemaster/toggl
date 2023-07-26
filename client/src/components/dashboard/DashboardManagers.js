import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getManagers} from "../../actions/dashboard";
import Loader from "../layout/Loader";

class DashboardManagers extends Component {
    constructor(props) {
        super(props);

        this.props.getManagers();
    }
    render() {
        return (
            <div className="card">
                <div className="card-header">
                    Managers
                </div>
                <div className="card-body">
                    {this.props.dashboard.managersLoading && <Loader></Loader>}
                    <table className="table table-striped" style={{marginTop: '10px'}}>
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col" className="text-center">Developers</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.dashboard.managers.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td className="text-center">{user.count}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    dashboard: state.dashboard
});

export default connect(
    mapStateToProps, {getManagers}
)(DashboardManagers);