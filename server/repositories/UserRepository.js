const User = require('../models/User');
const bcrypt = require("bcryptjs");

const getById = (id) => {
    return User.findById(id);
}

const getAll = () => {
    return User.find();
}

const getByEmail = (email) => {
    return User.findOne({email: email});
}

const create = (data) => {
    let user = new User(data);
    return user.save();
}

const update = async (id, data) => {
    let response = await User.updateOne({_id: id}, data);
    return response.modifiedCount === 1;
}

const remove = async (id) => {
    let response = await User.deleteOne({_id: id});

    return parseInt(response.deletedCount) > 0;
}

const getByEmailAndNotId = (email, id) => {
    return User.find({email: email, _id : {$ne: id}});
}

module.exports = {
    getById,
    getAll,
    getByEmail,
    create,
    update,
    remove,
    getByEmailAndNotId
}