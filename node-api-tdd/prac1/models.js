const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './dn.sqlite',
  logging: false // 기본값 console.log와 바인딩 되어있다.
});

const User = sequelize.define('User', {
  name: {
    type: Sequelize.STRING,
    unique: true
  }
})

const Menu = sequelize.define('Menu', {
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  price: {
    type: Sequelize.STRING
  },
  rating: {
    type: Sequelize.INTEGER
  }
})

const Chef = sequelize.define('Chef', {
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  career: {
    type: Sequelize.STRING
  }
})

module.exports = { Sequelize, sequelize, User, Menu, Chef };
