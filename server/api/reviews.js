const router = require('express').Router()
const Review = require('../db/models/Review') //review
const User = require('../db/models/user')
const Product = require('../db/models/product')

//GET
router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      include: {model: User, Product}
    })
    res.json(reviews)
  } catch (error) {
    next(error)
  }
})

//GET by id
router.get('/:id', async (req, res, next) => {
  try {
    const review = await Review.find({
      where: {
        id: req.params.id
      },
      include: {
        model: User,
        Product
      }
    })
    res.json(review)
  } catch (error) {
    next(error)
  }
})

//POST product
router.post('/', async (req, res, next) => {
  try {
    const review = await Review.create(req.body)
    res.json(review)
  } catch (error) {
    next(error)
  }
})

// DELETE product
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    await Review.destroy({where: {id: id}})
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

//UPDATE product by id
router.put('/:id', async (req, res, next) => {
  try {
    const review = await Review.find({
      where: {
        id: req.params.id
      }
    })
    await review.update(req.body)
    res.json(review)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

// router.put("/:productid/:reviewid", async (req, res, next) => {
//   try {
//     const product = await Product.find({
//       where: {
//         id: req.params.productid
//       },
//       include: {
//         model: User, Review
//       }
//     });

//     const review = await Review.find({
//       where: {
//         id: req.params.reviewid
//       },
//       include: {
//         model: User, Product
//       }
//     });

//     product.removeReview(review);

//     await project.update(req.body.product);

//     res.json(project);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router
