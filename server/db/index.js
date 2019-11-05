const db = require("./db");
const Review = require("./models/review");
const Cart = require("./models/cart");

// register models
require("./models");

Review.belongsTo(User, { as: "UserReview" });
Product.hasMany(Review, { as: "ProductReview" });
Cart.belongsTo(User, { as: "UserCart" });
Cart.hasMany(Product, { as: "CartProduct" });

module.exports = db;
