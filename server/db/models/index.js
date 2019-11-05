const User = require('./User')
const Product = require('./Product')
const Order = require('./Order')
const CartProduct = require('./CartProduct')
const Review = require('./Review')

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
  CartProduct,
  Review
}
