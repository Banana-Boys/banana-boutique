const Sequelize = require('sequelize')
const db = require('../db')

const Wishlist = db.define('wishlist', {
  //   fk reference to productId(s) and/or bundleId(s) through WishlistLineItem
  //   fk reference to shippingAddress
  //   fk reference to User
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shippingTax: {
    type: Sequelize.STRING,
    defaultValue: 0
  }
  // Subtotal will be calculated as a function of the line items, promotion, and shipping tax as an instance method
})

module.exports = Wishlist
