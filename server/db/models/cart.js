const Sequelize = require("sequelize");
const db = require("../db");
//import Product from './product'
//import User from './user'

const Cart = db.define("cart", {});

//Cart.belongsTo(User, {through: 'UserItem'})
//Cart.hasMany(Product, {through: 'ProductItem'})

export default Cart;
