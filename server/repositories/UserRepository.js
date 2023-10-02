//const User = require('../models/User');
const bcrypt = require("bcryptjs");
const User = require("../models/UserMysql");

const getById = async (id) => {
    let user = await User.findByPk(id);
    if (!user) {
        throw "User not found";
    }
    return user;
}

const getAll = async () => {
    try {
        return await User.findAll({
            attributes: ['id', 'name', 'email', 'role', 'toggl_api_key', 'parent_id']
        });
    } catch (error) {
        return [error];
    }
}

const getByEmail = async (email) => {
    return await User.findOne({ where: { email: email }});
}

const getByParentId = async (parent_id) => {
    return await User.findOne({
        attributes: ['id', 'name', 'email', 'role', 'toggl_api_key', 'parent_id'],
        where: { parent_id: parent_id }
    });
}

const create = async (data) => {
    data.parent_id = !data.parent_id ? null : data.parent_id;
    return await User.create(data);
}

const update = async (id, data) => {
    data.parent_id = !data.parent_id ? null : data.parent_id;

    let response = await User.update(
        data,
        {
            where: {
                id: id
            }
        });

    return response;
}

const remove = async (id) => {
    return await User.destroy({
        where: {id: id}
    });;
}

const getByEmailAndNotId = async (email, id) => {
    return await User.findAll({
        where: {
            email: email,
            id: {$not: id}
        }
    });
}

const getByRole = async (role) => {
    return await User.findAll({ where: { role: role }});
}

const getByParentIdAndRole = async (parent_id, role) => {
    return await User.findAll({ where: { parent_id: parent_id,  role: role }});
}

module.exports = {
    getById,
    getAll,
    getByEmail,
    getByParentId,
    create,
    update,
    remove,
    getByEmailAndNotId,
    getByRole,
    getByParentIdAndRole
}