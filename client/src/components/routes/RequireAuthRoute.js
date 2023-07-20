import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";

const RequireAuthRoute = ({isAuthenticated, loading, children}) => {
    if (!isAuthenticated && !loading) {
        return (<Navigate to="/login"></Navigate>)
    }

    return children;
}

RequireAuthRoute.propTypes = {
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
});

export default connect(mapStateToProps, {})(RequireAuthRoute);