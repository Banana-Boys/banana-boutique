const User = require('./User')
const Product = require('./Product')
const Order = require('./Order')
const CartLineItem = require('./CartLineItem')
const Category = require('./Category')
const Address = require('./Address')
const OrderLineItem = require('./OrderLineItem')
const Review = require('./Review')

Address.belongsTo(User)
// User.hasOne(Address, {as: 'defaultShipping'})
// User.hasOne(Address, {as: 'defaultBilling'})
User.hasMany(Address)
User.hasMany(Review)
User.hasMany(CartLineItem)
User.hasMany(Order)
User.belongsToMany(Product, {as: 'ProductsUserReviewed', through: 'Review'})
User.belongsToMany(Product, {as: 'ProductsInUserCart', through: 'CartLineItem'})
User.belongsToMany(Product, {
  as: 'ProductsInUserOrder',
  through: 'OrderLineItem'
})

Product.belongsToMany(Category, {through: 'ProductCategory'})
Product.hasMany(Review)
Product.hasMany(OrderLineItem)
Product.hasMany(CartLineItem)
Product.belongsToMany(User, {as: 'UsersWhoReviewedProduct', through: 'Review'})
Product.belongsToMany(User, {
  as: 'UsersWithProductInCart',
  through: 'CartLineItem'
})
Product.belongsToMany(User, {
  as: 'UsersWithProductInOrder',
  through: 'OrderLineItem'
})

Order.belongsTo(User, {as: 'buyer'})
Order.belongsTo(User, {as: 'receiver'})
Order.hasMany(OrderLineItem)
Order.hasOne(Address, {as: 'shipping'})
Order.hasOne(Address, {as: 'billing'})

Category.belongsToMany(Product, {through: 'ProductCategory'})

Review.belongsTo(User)
Review.belongsTo(Product)

CartLineItem.belongsTo(User)
CartLineItem.belongsTo(Product)

OrderLineItem.belongsTo(Product)

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
