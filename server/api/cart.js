const router = require("express").Router();
const Cart = require("../db/models/cart");
const User = require("../db/models/user");
const Product = require("../db/models/product");

//GET
router.get("/", async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      include: { model: User, Product }
    });
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

//POST product
router.post("/", async (req, res, next) => {
  try {
    //const cart = await Cart.create(req.body);
    Cart.addProject(req.body);
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

// DELETE product
router.delete("/:id", async (req, res, next) => {
  try {
    const product = Product.findById(req.params.id);
    //await Cart.destroy({ where: { id: id } });
    Cart.removeProduct(product);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
