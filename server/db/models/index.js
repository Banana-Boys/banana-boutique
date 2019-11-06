const User = require('./User')
const Product = require('./Product')
const Order = require('./Order')
const CartLineItem = require('./CartLineItem')
const Category = require('./Category')
const Address = require('./Address')
const OrderLineItem = require('./OrderLineItem')
const Review = require('./Review')

User.hasOne(Address, {as: 'defaultShipping'})
User.hasOne(Address, {as: 'defaultBilling'})
User.hasMany(Address, {as: 'addresses'})
User.hasMany(Review)
User.hasMany(CartLineItem)
User.hasMany(Order)

Product.hasMany(Category, {through: 'ProductCategory'})
Product.hasMany(Review)
Product.hasMany(OrderLineItem)
Product.hasMany(CartLineItem)

Order.belongsTo(User, {as: 'buyer'})
Order.belongsTo(User, {as: 'receiver'})
Order.hasMany(OrderLineItem)
Order.hasOne(Address, {as: 'shipping'})
Order.hasOne(Address, {as: 'billing'})

Category.hasMany(Product, {through: 'ProductCategory'})

Review.belongsTo(User)
Review.belongsTo(Product)

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

//Review.belongsTo(User, {through: 'UserItem'})
//Product.hasMany(Review, {through: 'ProductItem'})
//Cart.belongsTo(User, {through: 'UserItem'})
//Cart.hasMany(Product, {through: 'ProductItem'})
module.exports = {
  User,
  Product,
  Order,
  CartLineItem,
  Category,
  Address,
  OrderLineItem,
  Review
}
