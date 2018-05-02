const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    db: './db.sqlite'
});

const User = sequelize.define('User', {
    name: Sequelize.DataTypes.STRING
});

module.exports = {Sequelize, sequelize, User}