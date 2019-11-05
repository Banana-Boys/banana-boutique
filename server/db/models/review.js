const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  title: {
    type: Sequelize.STRING,
    required: true,
    allowNull: false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  rating: {
    type: Sequelize.ENUM('1', '2', '3', '4', '5')
  }
})

module.exports = Review
