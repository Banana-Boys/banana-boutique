const Sequelize = require("sequelize");
const db = require("../db");
import Product from "./product";
import User from "./user";

const Review = db.define("review", {
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
    type: Sequelize.ENUM("1", "2", "3", "4", "5")
  }
});

Review.belongsTo(User, { as: "UserReview" });
Product.hasMany(Review, { as: "ProductReview" });

module.exports = Review;
