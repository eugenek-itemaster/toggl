const User = require('../models/User');
const bcrypt = require("bcryptjs");

const getById = (id) => {
    return User.findById(id);
}

const getAll = () => {
    return User.find().select(['name', 'email', 'role', 'toggl_api_key', 'parent_id']);
}

const getByEmail = (email) => {
    return User.findOne({email: email});
}

const getByParentId = (parent_id) => {
    return User.find({parent_id: parent_id}).select(['name', 'email', 'role', 'toggl_api_key', 'parent_id']);;
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
    getByParentId,
    create,
    update,
    remove,
    getByEmailAndNotId
}