const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const Address = require('./Address')

const User = db.define('user', {
  role: {
    type: Sequelize.ENUM(['user', 'guest', 'admin']),
    defaultValue: 'guest'
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING,
    unique: true
  },
  facebookId: {
    type: Sequelize.STRING,
    unique: true
  },
  // sessionId: {
  //   type: Sequelize.STRING,
  // },
  phone: {
    type: Sequelize.STRING,
    validate: {
      isNumeric: true
    }
  },
  stripeTokens: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  resetPassword: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  defaultBillingAddressId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'addresses',
      key: 'id'
    }
  },
  defaultShippingAddressId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'addresses',
      key: 'id'
    }
  },
  imageUrl: {
    type: Sequelize.STRING
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

const setPhone = user => {
  if (user.phone) {
    const numbers = '1234567890'
    let phone = ''
    for (let char of user.phone) {
      phone += numbers.includes(char) ? char : ''
    }
    user.phone = phone
  }
}

User.beforeCreate(user => {
  setSaltAndPassword(user)
  setPhone(user)
})
User.beforeUpdate(user => {
  setSaltAndPassword(user)
  setPhone(user)
})
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
  users.forEach(setPhone)
})

// User.hasOne(Address, { as: "defaultShipping" });
// User.hasOne(Address, { as: "defaultBilling" });
// User.hasMany(Address, { as: "addresses" });
// User.hasMany(Review);
// User.hasOne(Cart);
// User.hasMany(Wishlist);
// User.hasMany(Order);
