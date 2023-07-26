import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getDevelopers, stopTracker} from "../../actions/dashboard";
import {TOGGL_IN, TOGGL_OFF} from "../../data/constans";
import {PauseCircle, RefreshCcw, List} from "react-feather";
import DateRangePicker from "react-bootstrap-daterangepicker";
import dayjs from "dayjs";

import 'bootstrap-daterangepicker/daterangepicker.css';
import {Link} from "react-router-dom";
import Loader from "../layout/Loader";

class DashboardDevelopers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: dayjs().format('YYYY-MM-DD'),
            endDate: dayjs().format('YYYY-MM-DD')
        }

        this.props.getDevelopers(this.state.startDate, this.state.endDate);

        this.onChangeDate = this.onChangeDate.bind(this);
    }

    onChangeDate(startDate, endDate) {
        if (startDate !== undefined && endDate !== undefined) {
            this.setState({
                startDate: startDate.format('YYYY-MM-DD'),
                endDate: endDate.format('YYYY-MM-DD')
            });
        }

        setTimeout(() => {
            this.props.getDevelopers(this.state.startDate, this.state.endDate);
        }, 1);
    }

    onStopTracker(userId) {
        this.props.stopTracker(userId, this.state.startDate, this.state.endDate);
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    Developers
                </div>
                <div className="card-body">
                    {this.props.dashboard.developersLoading && <Loader></Loader>}
                    <div className="row">
                        <div className="col-md-10">
                            <DateRangePicker initialSettings={{
                                startDate: this.state.startDate,
                                endDate: this.state.endDate,
                                locale: {
                                    format: 'YYYY-MM-DD'
                                },
                                autoApply: true
                            }} onCallback={this.onChangeDate}>
                                <input type="text" className="form-control"/>
                            </DateRangePicker>
                        </div>
                        <div className="col-md-2">
                            <RefreshCcw role="button" className="text-primary" style={{width: '16px', height: '16px', marginTop: '10px'}} onClick={() => this.onChangeDate()}/>
                        </div>
                    </div>
                    <table className="table table-striped" style={{marginTop: '10px'}}>
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col" className="text-center">Status</th>
                                <th scope="col" className="text-center">Time (h:m)</th>
                                <th scope="col" className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.dashboard.developers.map(user => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td dangerouslySetInnerHTML={{__html: user.status === false ? '' : (user.status === 1 ? TOGGL_IN : TOGGL_OFF)}} className="text-center">
                                    </td>
                                    <td className="text-center">{user.time}</td>
                                    <td className="text-center">
                                        {user.action ? <PauseCircle className="text-danger" role="button" onClick={() => this.onStopTracker(user.id)}/> : <PauseCircle className="text-secondary"/>}
                                        <Link to={`/users/${user.id}`} className="text-primary text-decoration-none" style={{marginLeft: '15px'}}>
                                            <List></List>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    dashboard: state.dashboard
});
export default connect(
    mapStateToProps, {getDevelopers, stopTracker}
)(DashboardDevelopers);