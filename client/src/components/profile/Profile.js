import React, {Component} from 'react';
import {connect} from 'react-redux';

class Profile extends Component {
    render() {
        return (
            <div>
                AAAAAA
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(Profile);