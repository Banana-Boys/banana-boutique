/* eslint-disable max-statements */
'use strict'
const faker = require('faker')
const {db} = require('../server/db')
const {
  User,
  Product,
  Category,
  Review,
  CartLineItem,
  Order,
  OrderLineItem
  // Wishlist
} = require('../server/db/models')

const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

async function seed() {
  //DROP SESSION DATA
  const sessionStore = new SequelizeStore({db})

  await sessionStore.sync()
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
      name: 'Green'
    }),
    Category.create({
      name: 'Yellow'
    }),
    Category.create({
      name: 'Bushel'
    }),
    Category.create({
      name: 'Single'
    }),
    Category.create({
      name: 'Art'
    })
  ])

  // CREATE RANDOM USERS
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

  let products = []

  // CREATE GREEN BUSHELS
  const greenCategory = categories[0]
  const bushelCategory = categories[2]
  for (let green = 0; green < 10; green++) {
    const imageUrl = `https://nanas-image-store.s3.us-east-2.amazonaws.com/bushel-green-${Math.round(
      Math.random() * 3
    )}.jpg`
    const price = Math.ceil(Math.random() * 100)
    const inventory = Math.ceil(Math.random() * 11)
    const description = faker.lorem.paragraph()

    const product = {
      name: [faker.commerce.productAdjective(), 'Nana'].join(' '),
      imageUrl,
      price,
      inventory,
      description
    }
    products.push([product, [greenCategory, bushelCategory]])
  }

  // CREATE YELLOW BUSHELS
  const yellowCategory = categories[1]
  for (let yellow = 0; yellow < 20; yellow++) {
    const imageUrl = `https://nanas-image-store.s3.us-east-2.amazonaws.com/bushel-yellow-${Math.round(
      Math.random() * 5
    )}.jpg`
    const price = Math.ceil(Math.random() * 10000)
    const inventory = Math.ceil(Math.random() * 11)
    const description = faker.lorem.paragraph()

    const product = {
      name: [faker.commerce.productAdjective(), 'Nana'].join(' '),
      imageUrl,
      price,
      inventory,
      description
    }
    products.push([product, [yellowCategory, bushelCategory]])
  }
  // CREATE YELLOW SINGLES
  const singleCategory = categories[3]
  for (let single = 0; single < 5; single++) {
    const imageUrl = `https://nanas-image-store.s3.us-east-2.amazonaws.com/single-${Math.round(
      Math.random()
    )}.jpg`
    const price = Math.ceil(Math.random() * 1000)
    const inventory = Math.ceil(Math.random() * 11)
    const description = faker.lorem.paragraph()

    const product = {
      name: [faker.commerce.productAdjective(), 'Nana'].join(' '),
      imageUrl,
      price,
      inventory,
      description
    }
    products.push([product, [singleCategory]])
  }

  // CREATE ART NANAS
  const artCategory = categories[4]
  for (let art = 0; art < 7; art++) {
    const imageUrl = `https://nanas-image-store.s3.us-east-2.amazonaws.com/art-${Math.round(
      Math.random() * 4
    )}.jpg`
    const price = Math.ceil(Math.random() * 10000000)
    const inventory = Math.ceil(Math.random() * 11)
    const description = faker.lorem.paragraph()

    const product = {
      name: [faker.commerce.productAdjective(), 'Nana'].join(' '),
      imageUrl,
      price,
      inventory,
      description
    }
    products.push([product, [artCategory]])
  }

  // shuffles nana objects before creation step
  products.sort(() => Math.random() - 0.5)
  await Promise.all(
    products.map(([product, cats]) => {
      return Product.create(product).then(nan => nan.setCategories(cats))
    })
  )

  const allProducts = await Product.findAll()
  // CREATE RANDOM REVIEWS
  const reviews = []
  for (let userIndex = 0; userIndex < randomUsers.length; userIndex++) {
    for (
      let productIndex = 0;
      productIndex < allProducts.length;
      productIndex++
    ) {
      let rating = Math.random() * 5
      rating = Math.ceil(rating)

      await allProducts[productIndex].update({
        numratings: allProducts[productIndex].numratings + 1,
        sumratings: allProducts[productIndex].sumratings + rating
      })

      reviews.push(
        Review.create({
          title: faker.hacker.phrase(),
          body: faker.lorem.paragraph(),
          rating: rating.toString(),
          productId: allProducts[productIndex].id,
          userId: randomUsers[userIndex].id
        })
      )
    }
  }

  // AUTH USER WITH CART
  const userWithCart = await User.create({
    name: 'userWithCart',
    email: 'userCart@email.com',
    password: '123',
    role: 'user'
  })

  await Promise.all(
    [2, 4, 8].map(index =>
      CartLineItem.create({
        quantity: 1,
        productId: index,
        userId: userWithCart.id
      })
    )
  )

  // AUTH/UNAUTH USER WITH ORDER
  const userWithOrder = await User.create({
    name: 'userWithOrder',
    email: 'userOrder@email.com',
    password: '123',
    role: 'user'
  })

  const order = await Order.create({
    buyerId: userWithOrder.id,
    datePlaced: new Date()
  })

  await Promise.all(
    [4, 8, 12].map(index =>
      OrderLineItem.create({
        quantity: 1,
        price: Math.floor(Math.random() * 10000),
        productId: index,
        orderId: order.id
      })
    )
  )

  const guestWithOrder = await User.create({
    name: 'guestWithOrder',
    email: 'guestOrder@email.com',
    role: 'guest'
  })

  const orderGuest = await Order.create({
    buyerId: guestWithOrder.id,
    datePlaced: new Date()
  })

  await Promise.all(
    [5, 20, 10].map(index =>
      OrderLineItem.create({
        quantity: 1,
        price: Math.floor(Math.random() * 20000),
        productId: index,
        orderId: orderGuest.id
      })
    )
  )

  // AUTH/UNAUTH USER WITH WISHLIST
  // const userWishlist = await User.create({
  //   name: 'userWithWishlist',
  //   email: 'userWishlist@email.com',
  //   role: 'user'
  // })

  // const wishlist = await Wishlist.create({
  //   userId: userWithlist.id
  // })

  // await Promise.all(
  //   [5, 20, 10].map(index =>
  //     WishlistLineItem.create({
  //       quantity: 1,
  //       productId: index,
  //       wishlistId: wishlist.id
  //     })
  //   )
  // )

  await Promise.all(reviews)

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
