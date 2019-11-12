const {User} = require('../db/models')

const passwordReset = async (req, res, next) => {
  if (!req.body.password) {
    next()
  } else {
    const user = await User.findByPk(req.user.id)
    if (!user.correctPassword(req.body.oldPassword)) {
      res.status(401).send('Your password was incorrect')
    } else {
      delete req.body.oldPassword
      next()
    }
  }
}

module.exports = {
  passwordReset
}
