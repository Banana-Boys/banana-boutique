const router = require('express').Router()
module.exports = router

router.use('/reviews', require('../api/reviews'))

router.use('/cartlineitem', require('./cartlineitem'))

router.use('/users', require('./users'))

router.use('/products', require('./products'))

router.use('/orders', require('./orders'))

router.use('/categories', require('./categories'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
