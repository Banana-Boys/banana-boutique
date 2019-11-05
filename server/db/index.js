const db = require('./db')
const Review = require('./models/Review')
const Cart = require('./models/Cart')
const User = require('./models/User')
const Product = require('./models/Product')

// register models
require('./models')

Review.belongsTo(User, {as: 'UserReview'})
Product.hasMany(Review, {as: 'ProductReview'})
Cart.belongsTo(User, {as: 'UserCart'})
Cart.hasMany(Product, {as: 'CartProduct'})

module.exports = db
