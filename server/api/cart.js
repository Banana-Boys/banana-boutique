const router = require('express').Router()
const CartLineItem = require('../db/models/CartLineItem')
const User = require('../db/models/user')
const Product = require('../db/models/product')

// //GET
// router.get('/', async (req, res, next) => {
//   try {
//     const CartLineItem = await CartLineItem.findAll({
//       include: {model: User, Product}
//     })
//     res.json(CartLineItem)
//   } catch (error) {
//     next(error)
//   }
// })

//POST product
router.post('/', async (req, res, next) => {
  const {productId, quantity} = req.body
  try {
    if (!req.session.cart) {
      req.session.cart = []
    }
    req.session.cart.push(req.body)
    if (req.user) {
      const [user, product] = await Promise.all([
        User.findByPk(req.user.id),
        Product.findByPk(productId)
      ])
      const cartLineItem = await CartLineItem.create({quantity})
      await Promise.all([
        cartLineItem.addProduct(product),
        cartLineItem.addUser(user)
      ])
    }
  } catch (error) {
    next(error)
  }
})

// // DELETE product
// router.delete('/:id', async (req, res, next) => {
//   try {
//     const product = Product.findById(req.params.id)
//     //await Cart.destroy({ where: { id: id } });
//     CartLineItem.removeProduct(product)
//     res.sendStatus(200)
//   } catch (err) {
//     next(err)
//   }
// })

module.exports = router
