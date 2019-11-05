const Sequelize = require('Sequelize')
const db = require('../db')

const CartProduct = db.define('cartproduct', {
  quantity: {
    type: Sequelize.FLOAT
  }
})

module.exports = CartProduct
