import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AlertCircle, CheckCircle} from "react-feather";
import {ALERT_SUCCESS} from "../../data/constans";

class Alert extends Component {
    render() {
        return (
            <div>
                {Object.keys(this.props.alert).length > 0 &&
                <div key={this.props.alert.id} className={'alert alert-float alert-' + this.props.alert.alertType} role="alert">
                    {alert.alertType === ALERT_SUCCESS ? <CheckCircle/> : <AlertCircle/> } &nbsp; { this.props.alert.msg }
                </div>}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    alert: state.alert
})

export default connect(
    mapStateToProps,
)(Alert);