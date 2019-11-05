const Sequelize = require("sequelize");
const db = require("../db");
import Product from "./product";
import User from "./user";

const Cart = db.define("cart", {});

Cart.belongsTo(User, { as: "UserCart" });
Cart.hasMany(Product, { as: "CartProduct" });

module.exports = Cart;
