const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite'
});

const User = sequelize.define('User', {
    name: Sequelize.DataTypes.STRING
});

module.exports = {Sequelize, sequelize, User}