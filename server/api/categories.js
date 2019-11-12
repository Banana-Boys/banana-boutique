const router = require('express').Router()
const Category = require('../db/models/Category')
const {isAdmin} = require('../middleware')
//GET
router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll({order: ['name']})
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
router.put('/:id', isAdmin, async (req, res, next) => {
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

//CREATE category
router.post('/', isAdmin, async (req, res, next) => {
  try {
    const category = Category.build(req.body)
    await category.save()
    const returnCategory = category.toJSON()
    res.json(returnCategory)
  } catch (err) {
    next(err)
  }
})

module.exports = router
