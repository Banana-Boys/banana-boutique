const Sequelize = require('sequelize')
const db = require('../db')

const WishlistLineItem = db.define('wishlistLineItem', {
  //   fk reference to productId(s) and/or bundleId(s)
  //   fk reference to orderId
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
})

module.exports = WishlistLineItem

// OrderLineItem.hasOne(Product)
// OrderLineItem.belongsTo(Order)
