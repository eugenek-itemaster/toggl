import {React, Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";

class PermissionMiddleware extends Component {
    render() {
        let onlyFor = this.props.onlyFor;
        let isLink = this.props.isLink ?? false;

        if (!this.props.onlyFor.includes(this.props.user.role) && isLink && !this.props.userLoading) {
            return (<Navigate to="/"></Navigate>)
        } else if (!this.props.onlyFor.includes(this.props.user.role) && !isLink) {
            return false;
        }

        return this.props.children;
    }
}

PermissionMiddleware.propTypes = {
    user: PropTypes.object,
    userLoading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    user: state.auth.user,
    userLoading: state.auth.loading
});

export default connect(mapStateToProps, {})(PermissionMiddleware);