const db = require('./db')
const Review = require('./models/Review')
const CartProduct = require('./models/CartLineItem')
const User = require('./models/User')
const Product = require('./models/Product')

// register models
require('./models')

module.exports = db
