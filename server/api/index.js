const router = require("express").Router();
module.exports = router;

// const Review = require("../db/models/review");
// const Cart = require("../db/models/cart");
// const User = require("../db/models/user");

// //mount on api
// router.use("/reviews", require("../api/reviews"));
// router.use("/cart", require("../api/cart"));
// router.use("/users", require("../api/users"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
