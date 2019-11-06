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

router.get('/', (req, res, next) => {
  try {
    const products = Product.findAll()
    res.json(products)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id
      },
      include: [Review]
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

// //UPDATE product by id
// router.put('/:id', async (req, res, next) => {
//   try {
//     const product = await Product.find({
//       where: {
//         id: req.params.id
//       }
//     })
//     await product.update(req.body)
//     res.json(product)
//   } catch (error) {
//     console.log(error)
//     next(error)
//   }
// })

module.exports = router
