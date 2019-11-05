const Sequelize = require('sequelize')
const db = require('../db')
const util = require('../../../util')

const Address = db.define('address', {
  address1: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address2: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.ENUM(util.states)
  },
  country: {
    type: Sequelize.ENUM(util.countries),
    allowNull: false
  },
  zip: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Address
