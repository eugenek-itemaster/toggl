import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getProfile} from "../../actions/profile";
import {useParams} from "react-router-dom";
import {ROLE_ADMIN, ROLE_DEVELOPER, ROLE_MANAGER} from "../../data/constans";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class Profile extends Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.authUser !== prevProps.authUser) {
            this.props.getProfile(this.props.params.userId, this.props.authUser);
        }
    }

    render() {
        if (this.props.profile.blocked) {
            return (
                <h3 className="text-center">You can't see this user. Permission denied.</h3>
            );
        }

        return (
            <div>
                {this.props.profile.user._id === undefined && !this.props.profile.loading  && <div>
                    <h3 className="text-center">User not found</h3>
                </div>}

                {this.props.profile.user._id !== undefined && !this.props.profile.loading && <div>
                    <h1 className="h2">Profile for {this.props.profile.user.role} {this.props.profile.user.name}</h1>
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
    mapStateToProps, {getProfile}
)(withParams(Profile));