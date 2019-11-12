const router = require('express').Router()
const {User, Review, Product, Order, OrderLineItem} = require('../db/models')
const {passwordReset, isAdmin} = require('../middleware')
module.exports = router

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
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

router.delete('/:id', isAdmin, async (req, res, next) => {
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

// not very secure, fix need to fix redux request to /orders
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
