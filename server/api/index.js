const router = require('express').Router()
module.exports = router

router.use('/reviews', require('../api/reviews'))
<<<<<<< HEAD
router.use('/cart', require('../api/cart'))
=======
router.use('/cartlineitem', require('./cartlineitem'))
>>>>>>> master

router.use('/users', require('./users'))

router.use('/products', require('./products'))

router.use('/orders', require('./orders'))
<<<<<<< HEAD

router.use('/categories', require('./categories'))
=======
>>>>>>> master

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
