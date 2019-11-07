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
      name: 'Benign'
    }),
    Category.create({
      name: 'Malignant'
    }),
    Category.create({
      name: 'Inoculated'
    }),
    Category.create({
      name: 'Tasty'
    })
  ])

  // CREATE RANDOM REVIEWS
  const randomUsers = []
  let numUsers = 10
  while (numUsers > 0) {
    const user = await User.create({
      name: faker.name.lastName(),
      email: faker.internet.email(),
      password: '123',
      role: 'user'
    })
    randomUsers.push(user)
    numUsers--
  }

  // CREATE RANDOM PRODUCTS
  let i = NUM_PRODUCTS
  const products = []
  while (i > 0) {
    const product = await Product.create({
      name: faker.commerce.product(),
      price: 1000,
      description: faker.commerce.productAdjective(),
      inventory: 5
    })
    let index = Math.floor(Math.random() * categories.length)
    let jndex = Math.floor(Math.random() * categories.length)
    if (index !== jndex) {
      await product.setCategories([categories[index], categories[jndex]])
    } else {
      await product.setCategories([categories[index]])
    }
    products.push(product)
    i--
  }

  // CREATE RANDOM REVIEWS
  let userIndex = 0
  while (userIndex < randomUsers.length) {
    let productIndex = 0
    while (productIndex < products.length) {
      const review = await Review.create({
        title: faker.hacker.phrase(),
        body: faker.lorem.paragraph(),
        rating: Math.ceil(Math.random() * 5).toString(),
        productId: products[productIndex].id,
        userId: randomUsers[userIndex].id
      })
      productIndex++
    }
    userIndex++
  }

  console.log(`seeded ${users.length + randomUsers.length} users`)
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
