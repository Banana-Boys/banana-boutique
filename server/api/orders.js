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
const sendmail = require('sendmail')({silent: true})
const nodemailer = require('nodemailer')

// async..await is not allowed in global scope, must use a wrapper
async function main(email) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount()

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>' // html body
  })

  console.log('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

router.get('/', async (req, res, next) => {
  try {
    const query = req.query || {}
    if (req.user.role) {
      const orders = await Order.findAll({
        include: [
          {model: OrderLineItem, include: [{model: Product}]},
          {model: User, as: 'buyer'}
        ],
        where: query
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
    console.log('ID', req.params.id)
    if (req.user) {
      const order = await Order.findByPk(req.params.id, {
        include: [
          {model: OrderLineItem, include: [{model: Product}]},
          {model: Address, as: 'shipping'}
        ]
      })
      console.log('order', order)
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
    res.send(
      await Order.findByPk(req.params.id, {
        include: [
          {model: OrderLineItem, include: [{model: Product}]},
          {model: Address, as: 'shipping'},
          {model: User, as: 'buyer'}
        ]
      })
    )
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

    // Send confirmation email
    // console.log(user.email)
    // sendmail({
    //   from: 'test@yourdomain.com',
    //   to: user.email,
    //   subject: `Order confirmation ${order.id} from Nana's`,
    //   html: 'Mail of test sendmail ',
    // }, function (err, reply) {
    //   console.log(err && err.stack)
    //   console.dir(reply)
    // })

    main(user.email).catch(console.error)

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
