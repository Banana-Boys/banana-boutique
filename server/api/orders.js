const {Address, Order, OrderLineItem, CartLineItem} = require('../db/models')
const router = require('express').Router()
const {checkGuest, isAdmin} = require('../middleware')

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const orders = await Order.findAll({
        where: {
          userId: req.user.id
        },
        include: [OrderLineItem]
      })
      res.send(orders)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    if (req.user) {
      const order = await Order.findByPk(req.params.id, {
        include: [OrderLineItem, Address]
      })
      res.json(order)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:id', isAdmin(), async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id)
    await order.update(req.body)
    res.send(order)
  } catch (err) {
    next(err)
  }
})

router.post('/', checkGuest(), async (req, res, next) => {
  try {
    const {cartLineItems, user} = req.body

    // Creates Addresses
    const billingAddress = await Address.findOrCreate({
      where: user.billingAddress
    })

    const shippingAddress = await Address.findOrCreate({
      where: user.shippingAddress
    })

    // Create Order
    const order = await Order.create({
      datePlaced: new Date(),
      userId: user.id
    })

    // Associates Order
    await order.setBilling(billingAddress) //magic methods might not work
    await order.setShipping(shippingAddress)

    // Creates line item for each cart item
    cartLineItems.forEach(async lineItem => {
      await OrderLineItem.create({
        quantity: lineItem.quantity,
        price: lineItem.price,
        productId: lineItem.id,
        orderId: order.id
      })
    })

    // Clears Cart
    await CartLineItem.destroy({
      where: {userId: user.id}
    })

    // Returns Order
    res.json(
      await Order.findByPk(order.id, {
        include: [OrderLineItem, Address]
      })
    )
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', isAdmin(), async (req, res, next) => {
  try {
    const orderId = req.params.id
    await OrderLineItem.destroy({
      where: {orderId}
    })
    await Order.destroy({
      where: {id: orderId}
    })
  } catch (err) {
    next(err)
  }
})
module.exports = router
