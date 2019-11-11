const router = require('express').Router()
const CartLineItem = require('../db/models/CartLineItem')
const Product = require('../db/models/Product')

//GET
router.get('/', async (req, res, next) => {
  try {
    let cart
    // might have to play around with the order of this to make sure the session cart persists when a user logs in, and then will need save the session cart to the db
    if (req.session.cart && req.session.cart.length) {
      cart = req.session.cart
      cart = await Promise.all(
        cart.map(async cartLineItem => ({
          quantity: cartLineItem.quantity,
          product: await Product.findByPk(cartLineItem.productId, {
            attributes: ['id', 'imageUrl', 'inventory', 'name', 'price']
          })
        }))
      )
    } else if (req.user) {
      cart = await CartLineItem.findAll({
        where: {userId: req.user.id},
        include: [
          {
            model: Product,
            attributes: ['id', 'imageUrl', 'inventory', 'name', 'price']
          }
        ]
      })
      req.session.cart = cart
      req.session.save()
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
  let {productId, quantity} = req.body
  const product = await Product.findByPk(productId, {
    attributes: ['id', 'imageUrl', 'inventory', 'name', 'price']
  })
  try {
    if (!req.session.cart) {
      req.session.cart = []
    }
    let sameProduct = req.session.cart.find(
      lineItem => lineItem.productId === productId
    )
    if (sameProduct) {
      sameProduct.quantity += quantity
      quantity = sameProduct.quantity
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
    }
    res.status(200).json({product, quantity})
  } catch (error) {
    next(error)
  }
})

// DELETE product
router.delete('/:id', async (req, res, next) => {
  const productId = req.params.id

  try {
    req.session.cart = req.session.cart.filter(
      cartLineItem => cartLineItem.productId !== +productId
    )
    req.session.save()
    if (req.user) {
      const userId = req.user.id
      await CartLineItem.destroy({
        where: {productId, userId}
      })
    }
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

// UPDATE product
router.put('/:id', async (req, res, next) => {
  const productId = +req.params.id
  const {quantity} = req.body
  try {
    req.session.cart = [
      ...req.session.cart.filter(
        cartLineItem => cartLineItem.productId !== productId
      ),
      {productId, quantity}
    ]
    req.session.save()
    if (req.user) {
      const cartLineItem = await CartLineItem.findOne({
        where: {productId, userId: +req.user.id}
      })
      await cartLineItem.update({quantity})
    }
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

module.exports = router
