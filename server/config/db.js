const { Sequelize, DataTypes} = require("sequelize");
const config = require("config");

const sequelize = new Sequelize(
    config.get('mysql.database'),
    config.get('mysql.user'),
    config.get('mysql.password'),
    {
        'host': config.get('mysql.host'),
        'dialect': "mysql",
    }
);

module.exports = sequelize;