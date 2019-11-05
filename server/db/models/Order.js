const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  //   fk reference to productId(s) and/or bundleId(s) through OrderProduct
  //   Will store line item quantity and price in OrderProduct
  //   fk reference to shippingAddress
  //   fk reference to billingAddress
  //   fk reference to User as buyer
  //   fk reference to User as receiver
  //   fk reference to Promotion
  datePlaced: {
    type: Sequelize.DATE,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM(['created', 'processing', 'cancelled', 'completed']),
    defaultValue: 'created'
  },
  shippingTax: {
    type: Sequelize.FLOAT
  }
  // Subtotal will be calculated as a function of the line items, promotion, and shipping tax as an instance method
})

module.exports = Order

/**
 * instanceMethods
 */
Order.prototype.getSubtotal = function() {}

// Order.hasOne(Address, { as: "shippingAddress" });
// Order.hasOne(Address, { as: "billingAddress" });
// Order.hasMany(Product, { through: "OrderProduct" });
// Order.hasOne(User, { as: "buyer" });
// Order.hasOne(User, { as: "receiver" });
// Order.hasOne(Promotion);
