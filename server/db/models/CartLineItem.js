const Sequelize = require('sequelize')
const db = require('../db')

const CartLineItem = db.define('cartlineitem', {
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = CartLineItem
