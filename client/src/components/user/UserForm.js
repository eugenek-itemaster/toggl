import {React, Fragment, Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Modal, Button, Alert} from "react-bootstrap";
import {createUser, storeUser, updateUser} from "../../actions/user";
import PermissionMiddleware from "../middlewares/PermissionMiddleware";
import {ROLE_ADMIN, ROLE_DEVELOPER, ROLE_MANAGER} from "../../data/constans";

class UserForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user.user
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.user.user !== prevProps.user.user) {
            let user = this.props.user.user;
            if (this.props.authUser.role === ROLE_MANAGER && !user.role) {
                user.role = ROLE_DEVELOPER;
            }
            this.setState({user: user})
        }
    }

    onSubmit(e) {
        e.preventDefault();

        let user = this.state.user;

        if (user._id !== null) {
            this.props.updateUser(user._id, user);
        } else {
            if (this.props.authUser.role !== ROLE_ADMIN) {
                user.parent_id = this.props.authUser._id;
            }

            this.props.storeUser(user);
        }
    }

    handleChange(event) {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [event.target.name]: event.target.value
            }
        }))
    }

    render() {
        return (
            <Fragment>
                <Modal show={this.props.user.userPopup}>
                    <Modal.Header>
                        <Modal.Title>{this.props.user.user._id !== null ? 'Edit user ' + this.props.user.user.name : 'Add user'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="name"
                                        className="form-control"
                                        name="name"
                                        value={this.state.user.name}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={this.state.user.email}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={this.state.user.password}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Role</label>
                                    <select className="form-select" name="role" value={this.state.user.role} onChange={this.handleChange}>
                                        <option value=""></option>
                                        <PermissionMiddleware onlyFor={[ROLE_ADMIN]}><option value={ROLE_ADMIN}>{ROLE_ADMIN}</option></PermissionMiddleware>
                                        <PermissionMiddleware onlyFor={[ROLE_ADMIN]}><option value={ROLE_MANAGER}>{ROLE_MANAGER}</option></PermissionMiddleware>
                                        <PermissionMiddleware onlyFor={[ROLE_ADMIN, ROLE_MANAGER]}><option value={ROLE_DEVELOPER}>{ROLE_DEVELOPER}</option></PermissionMiddleware>
                                    </select>
                                </div>
                                {this.state.user.role === ROLE_DEVELOPER && this.props.authUser.role === ROLE_ADMIN && <div className="mb-3">
                                    <label className="form-label">Manager</label>
                                    <select className="form-select" name="parent_id" value={this.state.user.parent_id} onChange={this.handleChange}>
                                        <option value=""></option>
                                        {this.props.user.users.map(user => {
                                            if (user.role === ROLE_MANAGER) {
                                                return (<option key={user._id} value={user._id}>{user.name}</option>);
                                            }
                                        })}
                                    </select>
                                </div>}
                                <div className="mb-3">
                                    <label className="form-label">Toggl API key</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="toggl_api_key"
                                        value={this.state.user.toggl_api_key}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer className="text-end">
                        <Button variant="primary" size="sm" onClick={this.onSubmit}>{this.props.user.user._id !== null ? 'Save' : 'Create'}</Button>
                        <Button variant="secondary" size="sm" onClick={() => {this.props.createUser(false)}}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        )
    }
}

UserForm.propTypes = {
    user: PropTypes.object.isRequired,
    createUser: PropTypes.func.isRequired,
    storeUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    authUser: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    user: state.user,
    authUser: state.auth.user
});

export default connect(mapStateToProps, {createUser, storeUser, updateUser})(UserForm);