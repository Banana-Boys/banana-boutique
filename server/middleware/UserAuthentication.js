const {User} = require('../db/models')

export const checkGuest = () => {
  return async (req, res, next) => {
    if (!req.user) {
      const {email} = req.body.user
      const user = await User.findOrCreate({
        where: {email}
      })
      req.user = {id: user.id}
    }
    next()
  }
}

export const isAdmin = () => {
  return async (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      next()
    } else {
      res.sendStatus(403)
    }
  }
}