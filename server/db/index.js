const db = require('./db')
const Review = require('./models/Review')
const CartProduct = require('./models/CartProduct')
const User = require('./models/User')
const Product = require('./models/Product')

// register models
require('./models')

User.hasMany(Product, {through: 'UserProduct'})
Product.belongsTo(User, {through: 'UserProduct'})
Review.belongsTo(User, {through: 'UserReview'})
Product.hasMany(Review, {through: 'ProductReview'})
CartProduct.belongsTo(User, {through: 'UserCartProduct'})
CartProduct.manyToMany(Product, {through: 'CartProduct'})

module.exports = db
