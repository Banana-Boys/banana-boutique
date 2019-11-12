const router = require('express').Router()
const CartLineItem = require('../db/models/CartLineItem')
const Product = require('../db/models/Product')

//GET
router.get('/', async (req, res, next) => {
  try {
    let sessionCart = req.session.cart || []
    let savedCart = []
    if (req.user) {
      savedCart = await CartLineItem.findAll({
        where: {userId: req.user.id}
      })
    }
    let cart = []
    sessionCart.forEach(async sessionItem => {
      let sameSavedItem = savedCart.find(
        savedItem => savedItem.productId === sessionItem.productId
      )
      if (sameSavedItem) {
        let newQuantity = sameSavedItem.quantity + sessionItem.quantity
        cart.push({productId: sameSavedItem.productId, quantity: newQuantity})
        savedCart = savedCart.filter(
          savedItem => savedItem.productId !== sessionItem.productId
        )
        sameSavedItem.update({quantity: newQuantity})
      } else {
        cart.push(sessionItem)
        if (req.user) {
          await CartLineItem.create({
            quantity: sessionItem.quantity,
            productId: sessionItem.productId,
            userId: req.user.id
          })
        }
      }
    })
    savedCart.forEach(savedItem => {
      cart.push(savedItem)
    })
    req.session.cart = cart
    req.session.save()

    let cartWithProducts = await Promise.all(
      cart.map(async cartLineItem => ({
        quantity: cartLineItem.quantity,
        product: await Product.findByPk(cartLineItem.productId, {
          attributes: ['id', 'imageUrl', 'inventory', 'name', 'price']
        })
      }))
    )

    res.status(200).json(cartWithProducts)
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

    if (req.user) {
      sameProduct = await CartLineItem.findOne({
        where: {productId, userId: req.user.id}
      })
      if (sameProduct) {
        await sameProduct.update({quantity: quantity + sameProduct.quantity})
        await CartLineItem.findByPk(sameProduct.id)
      } else {
        await CartLineItem.create({
          quantity,
          productId,
          userId: req.user.id
        })
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
