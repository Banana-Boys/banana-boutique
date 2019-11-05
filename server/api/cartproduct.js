const router = require('express').Router()
const CartProduct = require('../db/models/cartproduct')
const User = require('../db/models/user')
const Product = require('../db/models/product')

//GET
router.get('/', async (req, res, next) => {
  try {
    const cartproduct = await CartProduct.findAll({
      include: {model: User, Product}
    })
    res.json(cartproduct)
  } catch (error) {
    next(error)
  }
})

//POST product
router.post('/', async (req, res, next) => {
  try {
    //const cart = await Cart.create(req.body);
    CartProduct.addProject(req.body)
    res.json(req.body)
  } catch (error) {
    next(error)
  }
})

// DELETE product
router.delete('/:id', async (req, res, next) => {
  try {
    const product = Product.findById(req.params.id)
    //await Cart.destroy({ where: { id: id } });
    CartProduct.removeProduct(product)
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

module.exports = router
