const router = require('express').Router()
const CartLineItem = require('../db/models/CartLineItem')

//GET
router.get('/', async (req, res, next) => {
  try {
    let cart
    // might have to play around with the order of this to make sure the session cart persists when a user logs in, and then will need save the session cart to the db
    if (req.session.cart) {
      cart = req.session.cart
    } else if (req.user) {
      cart = await CartLineItem.findAll({
        where: {userId: req.user.id},
        attributes: ['productId', 'quantity']
      })
    } else {
      cart = []
    }
    res.status(200).json(cart)
  } catch (error) {
    next(error)
  }
})

//POST product
router.post('/', async (req, res, next) => {
  const {productId, quantity} = req.body
  try {
    if (!req.session.cart) {
      req.session.cart = []
    }
    let sameProduct = req.session.cart.find(
      lineItem => lineItem.productId === productId
    )
    if (sameProduct) {
      sameProduct.quantity += quantity
    } else {
      req.session.cart.push(req.body)
    }
    req.session.save()

    let cartLineItem
    if (req.user) {
      sameProduct = await CartLineItem.findOne({where: {productId}})
      if (sameProduct) {
        await sameProduct.update({quantity: quantity + sameProduct.quantity})
        cartLineItem = await CartLineItem.findByPk(sameProduct.id)
      } else {
        cartLineItem = await CartLineItem.create({quantity})
        await Promise.all([
          cartLineItem.setProduct(productId),
          cartLineItem.setUser(req.user.id)
        ])
        cartLineItem = await CartLineItem.findByPk(cartLineItem.id)
      }
      res.status(200).json(cartLineItem)
    } else {
      res.status(200).json(req.body)
    }
  } catch (error) {
    next(error)
  }
})

// DELETE product
router.delete('/:id', async (req, res, next) => {
  const productId = req.params.id
  const userId = req.user.id
  try {
    req.session.cart = req.session.cart.filter(
      cartLineItem => cartLineItem.productId !== +productId
    )
    req.session.save()
    await CartLineItem.destroy({
      where: {productId, userId}
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

// UPDATE product
router.put('/:id', async (req, res, next) => {
  const productId = +req.params.id
  const {quantity} = req.body
  const userId = +req.user.id
  try {
    req.session.cart = [
      ...req.session.cart.filter(
        cartLineItem => cartLineItem.productId !== productId
      ),
      {productId, quantity}
    ]
    req.session.save()
    console.log(await CartLineItem.findAll())
    const cartLineItem = await CartLineItem.findOne({
      where: {productId, userId}
    })
    console.log(cartLineItem)
    await cartLineItem.update({quantity})
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

module.exports = router
