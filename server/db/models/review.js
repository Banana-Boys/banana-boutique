const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  title: {
    type: Sequelize.STRING
  },
  body: {
    type: Sequelize.TEXT
  },
  rating: {
    type: Sequelize.ENUM('1', '2', '3', '4', '5'),
    allowNull: false
  }
})

module.exports = Review
