const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './dn.sqlite',
  logging: false // 기본값 console.log와 바인딩 되어있다.
});

const User = sequelize.define('User', {
  name: Sequelize.STRING
})

module.exports = {Sequelize, sequelize, User};
