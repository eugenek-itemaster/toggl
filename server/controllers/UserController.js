const UserRepository = require('../repositories/UserRepository');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const getUsers = async (req, res) => {
    let users = await UserRepository.getAll();
    res.json(users);
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
    let { name, email, password, toggl_api_key } = req.body;

    try {

        let user = await UserRepository.getByEmail(email);
        if (user !== null) {
            throw 'User already exists.';
        }

        let salt = await bcrypt.genSalt(10);

        password = await bcrypt.hash(password, salt);

        let newUser = await UserRepository.create({
            name,
            email,
            password,
            toggl_api_key
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
    let { name, email, password, toggl_api_key } = req.body;
    let userId = req.params.userId;

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw 'Invalid user Id.';
        }

        let user = await UserRepository.getById(userId);

        if (user === null) {
            throw 'User not exists.';
        }

        let data = {};

        if (email !== undefined) {
            let newEmailUser = await UserRepository.getByEmailAndNotId(email, userId);

            if (newEmailUser.length > 0) {
                throw 'User with this email already exists.';
            }

            data.email = email;
        }

        if (password !== undefined && password !== '') {
            let salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);

            data.password = password;
        }

        if (name !== undefined) {
            data.name = name;
        }

        data.toggl_api_key = toggl_api_key;

        if (data) {
            let response = await UserRepository.update(userId, data);
            if (response) {
                res.json({success: true});
            } else {
                throw "User not updated.";
            }
        }
    } catch (error) {
        res.status(401).json({error: true, message: error});
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
}