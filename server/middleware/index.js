const {
  checkGuest,
  isAdmin,
  isUser,
  canEditReview,
  ownsAddress,
  ownsOrder,
  canViewOrders
} = require('./UserAuthentication')
const {passwordReset} = require('./ActionCheck')

module.exports = {
  checkGuest,
  isAdmin,
  isUser,
  passwordReset,
  canEditReview,
  ownsAddress,
  ownsOrder,
  canViewOrders
}
