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
      'https://cdn.clipart.email/a5b2f08b464dd175fba426d347842df2_campbells-soup-can-clipart_2032-3226.jpeg'
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
