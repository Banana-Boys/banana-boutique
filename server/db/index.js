const db = require('./db')
const Review = require('./models/Review')
const CartProduct = require('./models/CartLineItem')
const User = require('./models/User')
const Product = require('./models/Product')

// register models
require('./models')

User.belongsToMany(Product, {through: 'UserProduct'})
Product.belongsTo(User, {through: 'UserProduct'})
Review.belongsTo(User, {through: 'UserReview'})
Product.belongsToMany(Review, {through: 'ProductReview'})
CartProduct.belongsTo(User, {through: 'UserCartProduct'})
CartProduct.belongsToMany(Product, {through: 'CartProduct'})

module.exports = db
