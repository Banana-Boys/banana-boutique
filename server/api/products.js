const router = require('express').Router()
const {Product, Category} = require('../db')

router.post('/new', async (req, res, next) => {
  try {
    const {name, description, imageUrl, price, inventory, categories} = req.body
    const product = await Product.create({
      name,
      description,
      imageUrl,
      price,
      inventory
    })
    console.log(product)
    await Promise.all(
      categories.map(async categoryId => {
        const category = await Category.findByPk(categoryId)
        await product.addCategory(category)
      })
    )
    const productWithCategories = await Product.findByPk(product.id, {
      include: [Category]
    })
    console.log(productWithCategories)
    res.status(201).json(productWithCategories)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
