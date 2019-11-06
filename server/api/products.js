const router = require('express').Router()
const Product = require('../db/models/product')
const User = require('../db/models/user')
const Review = require('../db/models/review')

router.get('/', (req, res, next) => {
  try {
    const products = Product.findAll({
      include: {
        model: User,
        Review
      }
    })
    res.json(products)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.find({
      where: {
        id: req.params.id
      },
      include: {
        model: User,
        Review
      }
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

// DELETE product
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    await Product.destroy({where: {id: id}})
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

//UPDATE product by id
router.put('/:id', async (req, res, next) => {
  try {
    const product = await Product.find({
      where: {
        id: req.params.id
      }
    })
    await product.update(req.body)
    res.json(product)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

module.exports = router
