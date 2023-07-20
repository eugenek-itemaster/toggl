import {React, Fragment, useState, Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Modal, Button, Alert} from "react-bootstrap";
import {createUser, storeUser, updateUser, clearAlerts} from "../../actions/user";
import {AlertCircle} from "react-feather";

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
            this.setState({user: this.props.user.user})
        }
    }

    onSubmit(e) {
        e.preventDefault();

        let user = this.state.user;
        if (user._id !== null) {
            this.props.updateUser(user._id, user);
        } else {
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
        let errorAlert = false;
        if (this.props.user.error) {
            errorAlert = <Alert variant="danger"><AlertCircle/>{this.props.user.error}</Alert>
            setTimeout(this.props.clearAlerts, 3000);
        }

        return (
            <Fragment>
                <Modal show={this.props.user.userPopup}>
                    <Modal.Header>
                        <Modal.Title>{this.props.user.user._id !== null ? 'Edit user ' + this.props.user.user.name : 'Add user'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="modal-body">
                                {errorAlert}
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
    clearAlerts: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps, {createUser, storeUser, updateUser, clearAlerts})(UserForm);