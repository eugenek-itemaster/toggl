import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getProfile, getEntries, clearState} from "../../actions/profile";
import {useParams} from "react-router-dom";
import DateRangePicker from "react-bootstrap-daterangepicker";
import {RefreshCcw, AlertCircle} from "react-feather";
import Loader from "../layout/Loader";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Bar, Line} from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: false,
        title: {
            display: false,
        },
    },
};

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: this.props.userId ?? this.props.params.userId,
            isUserOnHomePage: this.props.userId
        };

        this.props.getProfile(this.state.userId, this.props.authUser, this.props.profile.startDate, this.props.profile.endDate);

        this.onChangeDate = this.onChangeDate.bind(this);
    }

    onChangeDate(startDate, endDate) {
        if (startDate !== undefined && endDate !== undefined) {
            this.props.profile.startDate = startDate.format('YYYY-MM-DD');
            this.props.profile.endDate = endDate.format('YYYY-MM-DD');
        }

        this.props.getEntries(this.state.userId, this.props.profile.startDate, this.props.profile.endDate);
    }

    componentWillUnmount() {
        this.props.clearState();
    }

    render() {
        if (this.props.profile.blocked) {
            return (
                <h3 className="text-center">You can't see this user. Permission denied.</h3>
            );
        }

        let entries = [];

        this.props.profile.entries.forEach((date, index) => {
            entries.push(<tr key={index}>
                <td colSpan="3" className="text-primary">{date.date}</td>
                <td className="text-primary">{date.durationFormatted}</td>
            </tr>)

            date.entries.forEach((entry) => {
                let tags = [];

                entry.tags.forEach((tag, index) => {
                   tags.push(<span key={entry.id + index} className="badge bg-success me-1">{tag}</span>);
                });

                let error = false;
                if (entry.error) {
                    error = <AlertCircle className="text-danger ms-2"></AlertCircle>;
                }

                entries.push(<tr key={entry.id} className={`${entry.stop ? '' : 'current-entry'} ${entry.error ? 'error-entry' : ''}`}>
                    <td>
                        {entry.title}
                    </td>
                    <td>{tags}</td>
                    <td>{entry.startFormatted} - {entry.stopFormatted} {error}</td>
                    <td>{entry.durationFormatted}</td>
                </tr>)
            });
        });

        return (
            <div>
                {this.props.profile.user._id === undefined && !this.props.profile.loading  && <div>
                    <h3 className="text-center">User not found</h3>
                </div>}

                {this.props.profile.user._id !== undefined && !this.props.profile.loading && <div className="user-info-page">
                    {!this.state.isUserOnHomePage && <h1 className="h2">Profile for {this.props.profile.user.role} {this.props.profile.user.name}</h1>}

                    <div className="row">
                        <div className="col-md-5">
                            <DateRangePicker initialSettings={{
                                startDate: this.props.profile.startDate,
                                endDate: this.props.profile.endDate,
                                locale: {
                                    format: 'YYYY-MM-DD'
                                },
                                autoApply: true
                            }} onCallback={this.onChangeDate}>
                                <input type="text" className="form-control"/>
                            </DateRangePicker>
                        </div>
                        <div className="col-md-1">
                            <RefreshCcw role="button" className="text-primary" style={{width: '16px', height: '16px', marginTop: '10px'}} onClick={() => this.onChangeDate()}/>
                        </div>
                        <div className="col-md-6"></div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div style={{position: 'relative'}}>
                                {this.props.profile.loadingData && <Loader></Loader>}
                                <table className="table" style={{marginTop: '10px'}}>
                                    <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Tags</th>
                                        <th scope="col">Time</th>
                                        <th scope="col" style={{width: '100px', fontSize: '18px'}} className="text-primary">{this.props.profile.totalDuration}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {entries}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {this.props.profile.totalDuration && <div className="row" style={{marginTop: '50px'}}>
                        <div className="col-md-12">
                            <Bar options={options} data={this.props.profile.chartData} />
                        </div>
                    </div>}
                </div>}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    profile: state.profile,
    authUser: state.auth.user,
})

export default connect(
    mapStateToProps, {getProfile, getEntries, clearState}
)(withParams(Profile));