const Sequelize = require("sequelize");
const db = require("../db");
//import Product from './product'
//import User from './user'

const Review = db.define("review", {
  title: {
    type: Sequelize.String,
    allowNull: false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

//Review.belongsTo(User, {through: 'UserItem'})
//Product.hasMany(Review, {through: 'ProductItem'})

export default Review;
