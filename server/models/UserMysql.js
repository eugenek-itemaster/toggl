const { DataTypes } = require('sequelize');
const db = require('../config/db');

const fields = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    toggl_api_key: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    parent_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    date: {
        type: DataTypes.DATE,
        default: Date.now()
    }
}

const User = db.define('user', fields, {
    timestamps: false
});

module.exports = User;