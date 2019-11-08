const router = require('express').Router()
const Category = require('../db/models/Category')

//GET
router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.json(categories)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id)
    res.json(category)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

//UPDATE categories by id
router.put('/:id', async (req, res, next) => {
  try {
    const {name} = req.body
    const category = await Category.findByPk(req.params.id)
    await category.update({
      name
    })
    res.status(200).json(category)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

module.exports = router
