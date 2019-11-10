const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue:
      'https://nanas-image-store.s3.us-east-2.amazonaws.com/banana-group-yellow.jpg'
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  numratings: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  sumratings: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Product
