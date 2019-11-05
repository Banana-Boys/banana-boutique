const router = require('express').Router()
const Category = require('../db/models/Category')

//GET
router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.json(categories)
  } catch (error) {
    next(error)
  }
})

module.exports = router
