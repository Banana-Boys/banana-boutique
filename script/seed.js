'use strict'
const faker = require('faker')
const {db} = require('../server/db')
const {User, Product, Category, Review} = require('../server/db/models')

async function seed() {
  const NUM_PRODUCTS = 100
  const NUM_CATEGORIES = 4

  await db.sync({force: true})
  console.log('db synced!')

  // USER SEED
  const users = await Promise.all([
    User.create({
      name: 'Michael',
      email: 'michael@email.com',
      password: '123',
      role: 'guest'
    }),
    User.create({
      name: 'George Michael',
      email: 'george-michael@email.com',
      password: '123',
      role: 'user'
    }),
    User.create({
      name: 'Job',
      email: 'job@email.com',
      password: '123',
      role: 'admin'
    })
  ])

  // CATEGORIES
  const categories = await Promise.all([
    Category.create({
      name: faker.commerce.productMaterial()
    }),
    Category.create({
      name: faker.commerce.productMaterial()
    }),
    Category.create({
      name: faker.commerce.productMaterial()
    }),
    Category.create({
      name: faker.commerce.productMaterial()
    })
  ])

  // CREATE USER WITH REVIEWS
  const userWithReviews = await User.create({
    name: 'Lindsey',
    email: 'lindsey@email.com',
    password: '123',
    role: 'user'
  })

  const productWithReviews = await Product.create({
    name: 'Blandana',
    price: 1000,
    description: 'Not the greatest, but will get the job done.',
    categoryId: categories[0].id,
    inventory: 5
  })

  const anotherProductWithReviews = await Product.create({
    name: 'Wowana',
    price: 10000,
    description: 'Perhaps the greatest banana ever found.',
    categoryId: categories[0].id,
    inventory: 5
  })

  const reviews = await Promise.all([
    Review.create({
      title: 'To Bland',
      body: 'This banana was way too bland, would not recommend.',
      rating: '2',
      userId: userWithReviews.id,
      productId: productWithReviews.id
    }),
    Review.create({
      title: 'So Guuuud',
      body: 'This banana was prime.',
      rating: '5',
      userId: userWithReviews.id,
      productWithReviews: anotherProductWithReviews.id
    })
  ])

  // PRODUCTS
  let i = NUM_PRODUCTS
  while (i > 0) {
    const product = await Product.create({
      name: faker.commerce.product(),
      price: 1000,
      description: faker.commerce.productAdjective(),
      inventory: 5
    })
    let index = Math.floor(Math.random() * categories.length)
    await product.setCategories([categories[index]])
    i--
  }

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
