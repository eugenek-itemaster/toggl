import {React, Fragment, useEffect} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getUsers, createUser, editUser, deleteUser} from "../../actions/user";
import {Trash, Edit2} from "react-feather";
import UserForm from "./UserForm";
import PermissionMiddleware from "../middlewares/PermissionMiddleware";
import {ROLE_ADMIN, ROLE_MANAGER} from "../../data/constans";

const UserList = ({ getUsers, user: { users, success }, createUser, editUser, deleteUser, clearAlerts }) => {
    useEffect(() => {
        getUsers()
    }, [getUsers]);

    const onEdit = (user, e) => {
        e.preventDefault();

        editUser(user);
    }

    const onDelete = (user, e) => {
        e.preventDefault();

        deleteUser(user);
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-md-10">
                    <h1 className="h2">Users</h1>
                </div>
                <PermissionMiddleware onlyFor={[ROLE_ADMIN, ROLE_MANAGER]}>
                    <div className="col-md-2 text-end">
                        <button className="btn btn-success btn-sm" onClick={createUser}>Add user</button>
                    </div>
                    <UserForm></UserForm>
                </PermissionMiddleware>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 && <tr>
                        <td colSpan="5" className="text-center">
                            <div className="spinner-border text-secondary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </td>
                    </tr>}
                    {users.length > 0 && users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <a href="/" className="text-primary me-2" onClick={(e) => onEdit(user, e)}><Edit2/></a>
                                <a href="/" className="text-danger" onClick={(e) => onDelete(user, e)}><Trash/></a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
}

UserList.propTypes = {
    getUsers: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    createUser: PropTypes.func.isRequired,
    editUser: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, { getUsers, createUser, editUser, deleteUser })(UserList);