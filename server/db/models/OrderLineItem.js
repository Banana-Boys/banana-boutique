const Sequelize = require('sequelize')
const db = require('../db')

const OrderLineItem = db.define('orderLineItem', {
  //   fk reference to productId(s) and/or bundleId(s)
  //   fk reference to orderId
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = OrderLineItem

// OrderLineItem.hasOne(Product)
// OrderLineItem.belongsTo(Order)
