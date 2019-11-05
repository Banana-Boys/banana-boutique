const Sequelize = require('Sequelize')
const db = require('../db')

const CartLineItem = db.define('cartlineitem', {
  quantity: {
    type: Sequelize.FLOAT
  }
})

module.exports = CartLineItem
