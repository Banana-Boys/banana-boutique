const router = require('express').Router()
const {User, Review, Product, Order, OrderLineItem} = require('../db/models')
module.exports = router

const passwordReset = async (req, res, next) => {
  if (!req.body.password) {
    next()
  } else {
    const user = await User.findByPk(req.user.id)
    if (!user.correctPassword(req.body.oldPassword)) {
      res.status(401).send('Your password was incorrect')
    } else {
      delete req.body.oldPassword
      next()
    }
  }
}

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'role', 'name', 'id']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', passwordReset, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    console.log(req.body)
    await user.update(req.body)
    const newUser = await User.findByPk(req.params.id)
    res.status(200).json(newUser)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await User.destroy({where: {id: req.params.id}})
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/reviews', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where: {
        userId: req.params.id
      },
      include: {
        model: User,
        Product
      },
      order: [['createdAt', 'DESC']]
    })

    res.json(reviews)
  } catch (error) {
    next(error)
  }
})

router.get('/:id/orders', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        buyerId: req.params.id
      },
      include: [
        {model: User, as: 'buyer'},
        {model: OrderLineItem, include: [{model: Product}]}
      ]
    })

    res.json(orders)
  } catch (error) {
    next(error)
  }
})
