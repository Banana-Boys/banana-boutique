const {User, Address, Order, OrderLineItem} = require('../db/models')
const router = require('express').Router()

const checkUserType = () => {
  return async (req, res, next) => {
    if (!req.user) {
      const {email} = req.body.user
      const user = await User.findOrCreate({
        where: {email}
      })
      req.user = {id: user.id}
    }
    next()
  }
}

router.get('/', checkUserType(), async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.user.id
      },
      include: [OrderLineItem]
    })
    res.send(orders)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {cartLineItems, user} = req.body

    const billingAddress = await Address.findOrCreate({
      where: user.billingAddress
    })

    const shippingAddress = await Address.findOrCreate({
      where: user.shippingAddress
    })

    const order = await Order.create({
      datePlaced: new Date(),
      userId: user.id
    })

    await order.setBilling(billingAddress)
    await order.setShipping(shippingAddress)

    cartLineItems.forEach(async lineItem => {
      await OrderLineItem.create({
        quantity: lineItem.quantity,
        price: lineItem.price,
        productId: lineItem.id,
        orderId: order.id
      })
    })
    res.json(
      await Order.findByPk(order.id, {
        include: [OrderLineItem, Address]
      })
    )
  } catch (err) {
    next(err)
  }
})

module.exports = router
