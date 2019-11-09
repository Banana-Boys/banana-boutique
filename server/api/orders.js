const {
  Address,
  Order,
  OrderLineItem,
  CartLineItem,
  User,
  Product
} = require('../db/models')
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
        include: [{model: OrderLineItem}, {model: Address, as: 'shipping'}]
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
    let {cart, user, shippingTax, shippingAddress} = req.body

    await Promise.all(
      cart.map(async item => {
        const product = await Product.findByPk(item.product.id)
        if (item.quantity > product.inventory) {
          const error = new Error()
          error.message = `Insufficient inventory (quantity: ${
            product.inventory
          }) to fulfill order of ${product.name} (id: ${
            product.id
          }, quantity: ${item.quantity})`
          throw error
        } else {
          await product.update({inventory: product.inventory - item.quantity})
        }
      })
    )

    if (!user.id) {
      const alreadyUser = await User.findOne({where: {email: user.email}})
      if (!alreadyUser) {
        user = await User.create({email: user.email})
      } else {
        user = alreadyUser
      }
    }

    // Creates Addresses
    if (!shippingAddress.id) {
      shippingAddress = await Address.create(shippingAddress)
      await shippingAddress.setUser(user.id)
    }

    // Create Order
    const order = await Order.create({shippingTax, datePlaced: Date.now()})

    // Associates Order
    // await order.setBilling(billingAddress) //magic methods might not work
    await order.setShipping(shippingAddress.id)
    await order.setBuyer(user.id)
    await order.setReceiver(user.id)

    // Creates line item for each cart item
    await Promise.all(
      cart.map(async lineItem => {
        const orderLineItem = await OrderLineItem.create({
          quantity: lineItem.quantity,
          price: lineItem.product.price
        })
        await orderLineItem.setProduct(lineItem.product.id)
        return orderLineItem.setOrder(order.id)
      })
    )
    // Clears Cart
    await CartLineItem.destroy({
      where: {userId: user.id}
    })
    req.session.cart = []
    req.session.save()

    // Returns Order
    res.json(
      await Order.findByPk(order.id, {
        include: [{model: OrderLineItem}, {model: Address, as: 'shipping'}]
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
