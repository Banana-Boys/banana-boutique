/* eslint-disable complexity */
const router = require('express').Router()
const {Product, Category, User, Review} = require('../db')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const {isUser} = require('../middleware')
const {overlap, sorter} = require('../../utilBackEnd/util')

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
    let products = await Product.findAll({include: [Category]})
    if (req.query.categories) {
      products = products.filter(product => {
        return overlap(
          req.query.categories,
          product.categories.map(category => category.id)
        )
      })
    }
    if (req.query.search) {
      products = products.filter(product =>
        product.name.includes(req.query.search)
      )
    }
    if (req.query.inStock === 'true') {
      products = products.filter(product => product.inventory)
    }
    if (req.query.sort) {
      products.sort(sorter(req.query.sort))
    }
    // if (req.query.categories) {
    //   req.query.categories.forEach(async categoryId => {
    //     const category = await Category.findByPk(categoryId)
    //     const categoryProducts = await category.getProducts()
    //     products = [...products, ...categoryProducts]
    //   })
    // } else {
    //   products = await Product.findAll()
    // }
    // console.log(products)

    // let products = []
    // if (!req.query.categoryIds && !req.query.searchTerms) {
    //   if (req.query.itemIds) {
    //     products = await Promise.all(
    //       req.query.itemIds.map(id => {
    //         return Product.findByPk(id)
    //       })
    //     )
    //   } else {
    //     products = await Product.findAll({
    //       include: [Category]
    //     })
    //   }
    // } else if (req.query.categoryIds && !req.query.searchTerms) {
    //   products = await Product.findAll({
    //     include: [Category]
    //   })
    // } else {
    //   products = await Product.findAll({
    //     where: {
    //       name: {
    //         [Op.or]: req.query.searchTerms
    //       }
    //     },
    //     include: [
    //       {
    //         model: Product,
    //         where: {
    //           id: {
    //             [Op.or]: req.query.categoryIds
    //           }
    //         }
    //       }
    //     ]
    //   })
    // }
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

router.post('/:id/reviews', isUser(), async (req, res, next) => {
  try {
    let review = await Review.create(req.body)
    await review.setUser(req.user.id)
    await review.setProduct(req.params.id)
    review = await Review.findByPk(review.id, {
      include: [{model: User, attributes: ['id', 'name']}]
    })
    const product = await Product.findByPk(req.params.id)
    await product.update({
      numratings: product.numratings + 1,
      sumratings: product.sumratings + Number(review.rating)
    })
    res.status(201).json(review)
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId/reviews/:reviewId', async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.reviewId)
    const product = await Product.findByPk(req.params.productId)
    await review.destroy()
    await product.update({
      numratings: product.numratings - 1,
      sumratings: product.sumratings - Number(review.rating)
    })
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

router.get('/:productId/reviews', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    const reviews = await product.getReviews({
      include: [{model: User, attributes: ['name', 'id']}]
    })
    res.status(201).json(reviews)
  } catch (error) {
    next(error)
  }
})

router.put('/:productId/reviews/:reviewId', async (req, res, next) => {
  try {
    let review = await Review.findByPk(req.params.reviewId)
    const product = await Product.findByPk(req.params.productId)
    const newSumRatings =
      product.sumratings - Number(review.rating) + Number(req.body.rating)
    console.log(newSumRatings)
    await review.update(req.body)
    await product.update({sumratings: newSumRatings})
    review = await Review.findByPk(req.params.reviewId, {
      include: [{model: User, attributes: ['name', 'id']}]
    })
    res.status(201).json(review)
  } catch (error) {
    next(error)
  }
})

module.exports = router
