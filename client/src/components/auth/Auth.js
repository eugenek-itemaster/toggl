import React, {useState} from 'react';
import aTeamLogo from '../../assets/images/a-team-logo.svg'
import togglLogo from '../../assets/images/toggl-logo.webp';
import {login} from "../../actions/auth";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Navigate} from "react-router-dom";

const Auth = ({login, isAuthenticated}) => {
    const [ formData, setFormData ] = useState({
        email: 'eugene.k@a-team.global',
        password: '1111111'
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();

        login(email, password);
    }

    if (isAuthenticated) {
        return <Navigate to="/"></Navigate>
    }

    return (
        <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className={'row auth-image-container'}>
                    <div className={'col-md-6 text-end'}>
                        <img src={ aTeamLogo } alt="A-Team global" className={'a-team-logo'}/>
                    </div>
                    <div className={'col-md-6 text-start'}>
                        <img src={ togglLogo } alt="A-Team global" className={'toggl-logo'}/>
                    </div>
                </div>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Login</h5>
                    </div>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={ e => onChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={ e => onChange(e)}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

Auth.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Auth);