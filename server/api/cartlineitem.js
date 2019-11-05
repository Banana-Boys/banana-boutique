const router = require('express').Router()
const CartLineItem = require('../db/models/CartLineItem')
const User = require('../db/models/user')
const Product = require('../db/models/product')

//GET
router.get('/', async (req, res, next) => {
  try {
    const CartLineItem = await CartLineItem.findAll({
      include: {model: User, Product}
    })
    res.json(CartLineItem)
  } catch (error) {
    next(error)
  }
})

//POST product
router.post('/', async (req, res, next) => {
  try {
    //const cart = await Cart.create(req.body);
    CartLineItem.addProject(req.body)
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
    CartLineItem.removeProduct(product)
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

module.exports = router
