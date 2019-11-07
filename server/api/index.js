const router = require('express').Router()
module.exports = router

router.use('/reviews', require('./reviews'))

router.use('/cart', require('./cart'))

router.use('/users', require('./users'))

router.use('/products', require('./products'))

router.use('/orders', require('./orders'))

router.use('/categories', require('./categories'))

router.use('/addresses', require('./addresses'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
