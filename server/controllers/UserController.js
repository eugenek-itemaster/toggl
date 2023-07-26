const UserRepository = require('../repositories/UserRepository');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const {ROLE_ADMIN} = require("../constants/constans");

const getUsers = async (req, res) => {
    try {
        let authUser = req.user;

        let users;
        if (authUser.role === ROLE_ADMIN) {
            users = await UserRepository.getAll();
        } else {
            users = await UserRepository.getByParentId(authUser.id);
        }

        res.json(users);
    } catch (error) {
        res.json({error: error});
    }
}

const getUser = async (req, res) => {
    try {
        let userId = req.params.userId;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw 'Invalid user Id.';
        }

        let user = await UserRepository.getById(userId);
        if (user === null) {
            throw 'User not found.';
        }

        res.json(user);
    } catch (error) {
        res.status(401).json({error: true, message: error});
    }
}

const createUser = async (req, res) => {
    let { name, email, password, role, toggl_api_key, parent_id } = req.body;

    try {
        let salt = await bcrypt.genSalt(10);

        password = await bcrypt.hash(password, salt);

        let newUser = await UserRepository.create({
            name,
            email,
            password,
            role,
            toggl_api_key,
            parent_id
        });

        if (newUser._id === undefined) {
            throw "User not added. Please try again later.";
        }

        res.json({success: true});
    } catch (error) {
        res.status(401).json({error: true, message: error});
    }
}

const deleteUser = async (req, res) => {
    try {
        let userId = req.params.userId;
        let user = await UserRepository.getById(userId);

        if (user === null) {
            throw "User not found.";
        }

        let userDeleted = await UserRepository.remove(userId);

        if (userDeleted) {
            res.json({success: true});
        } else {
            throw "User not deleted.";
        }
    } catch (err) {
        res.status(401).json({error: true, message: err});
    }
}

const updateUser = async (req, res) => {
    let { name, email, password, role, toggl_api_key, parent_id } = req.body;
    let userId = req.params.userId;

    try {
        let data = {};

        data.name = name;
        data.email = email;
        data.toggl_api_key = toggl_api_key;
        data.role = role;
        data.parent_id = parent_id;

        if (password !== undefined && password !== '') {
            let salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);

            data.password = password;
        }

        if (data) {
            let response = await UserRepository.update(userId, data);
            if (response) {
                res.json({success: true});
            } else {
                throw "User not updated";
            }
        }
    } catch (error) {
        res.status(401).json({errors: [error]});
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
}