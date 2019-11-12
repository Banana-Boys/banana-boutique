const {User, Review, Address, Order} = require('../db/models')

const checkGuest = async (req, res, next) => {
  if (!req.user) {
    const {email} = req.body.user
    const user = await User.findOrCreate({
      where: {email}
    })
    req.user = {id: user.id, email}
  }
  next()
}

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next()
  } else {
    res.sendStatus(403)
  }
}

const isUser = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.sendStatus(403)
  }
}

const canEditReview = async (req, res, next) => {
  const review = await Review.findByPk(req.params.id)
  if (req.user && req.user.role === 'admin') {
    next()
  } else if (req.user.id === +review.userId) {
    next()
  } else {
    res.sendStatus(403)
  }
}

const ownsAddress = async (req, res, next) => {
  const address = await Address.findByPk(req.params.id)
  if (req.user && req.user.role === 'admin') {
    next()
  } else if (req.user.id === +address.userId) {
    next()
  } else {
    res.sendStatus(403)
  }
}

const ownsOrder = async (req, res, next) => {
  const order = await Order.findByPk(req.params.id)
  if (req.user && req.user.role === 'admin') {
    next()
  } else if (req.user.id === +order.buyerId) {
    next()
  } else {
    res.sendStatus(403)
  }
}

const ownsProfile = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next()
  } else if (req.user && req.user.id === +req.params.id) {
    next()
  } else {
    res.sendStatus(403)
  }
}

const canViewOrders = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next()
  } else if (req.query && req.query.userId === +req.user.id) {
    next()
  } else {
    res.sendStatus(403)
  }
}

module.exports = {
  checkGuest,
  isAdmin,
  isUser,
  canEditReview,
  ownsAddress,
  ownsOrder,
  canViewOrders,
  ownsProfile
}
