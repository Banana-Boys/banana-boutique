const router = require('express').Router()
const {Product, Category, User, Review} = require('../db')
const {isUser, canEditReview} = require('../middleware')

//GET
router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      include: {model: User, Product},
      order: ['createdAt', 'DESC']
    })
    res.json(reviews)
  } catch (error) {
    next(error)
  }
})

//GET by id
router.get('/:id', async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id)
    res.json(review)
  } catch (error) {
    next(error)
  }
})

router.get('/product/:id', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where: {
        productId: req.params.id
      },
      include: {
        model: User,
        Product
      }
    })
    res.json(reviews)
  } catch (error) {
    next(error)
  }
})

router.get('/user/:id', async (req, res, next) => {
  try {
    // console.log('reqbody', req.params.id)
    // const user = await User.findById(req.params.id)
    // console.log('user', user)
    //console.log('test')
    //res.json(user)
  } catch (error) {
    next(error)
  }
})

//POST review
router.post('/:productId/:reviewId', isUser, async (req, res, next) => {
  try {
    const review = await Review.create(req.body)
    const rev = await Review.find({
      where: {
        productId: req.params.productId
      },
      include: {
        model: User,
        Product
      }
    })

    const product = await Product.find({
      where: {
        id: req.params.reviewId
      },
      include: {
        model: User,
        Review
      }
    })
    product.addReview(rev)
    res.json(review)
  } catch (error) {
    next(error)
  }
})

// DELETE product
router.delete('/:id', canEditReview, async (req, res, next) => {
  try {
    await Review.destroy({where: {id: req.params.id}})
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

//UPDATE product by id
router.put('/:id', canEditReview, async (req, res, next) => {
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
