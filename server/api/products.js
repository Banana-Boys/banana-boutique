const router = require('express').Router()
const {Product, Category, User, Review} = require('../db')

router.post('/', async (req, res, next) => {
  try {
    const {name, description, imageUrl, price, inventory, categories} = req.body
    const product = await Product.create({
      name,
      description,
      imageUrl,
      price,
      inventory
    })
    await Promise.all(
      categories.map(async categoryId => {
        const category = await Category.findByPk(categoryId)
        await product.addCategory(category)
      })
    )
    const productWithCategories = await Product.findByPk(product.id, {
      include: [Review, Category]
    })
    res.status(201).json(productWithCategories)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    console.log(products)
    res.json(products)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [Review, Category]
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [Review, Category]
    })
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
    const {name, description, imageUrl, price, inventory, categories} = req.body
    const product = await Product.findByPk(req.params.id)
    await product.update({
      name,
      description,
      imageUrl,
      price,
      inventory
    })
    await product.setCategories([])
    await Promise.all(
      categories.map(async categoryId => {
        const category = await Category.findByPk(categoryId)
        await product.addCategory(category)
      })
    )
    const productWithCategories = await Product.findByPk(product.id, {
      include: [Review, Category]
    })
    res.status(200).json(productWithCategories)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

module.exports = router
