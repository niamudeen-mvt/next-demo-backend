const express = require("express");
const cartRouter = express.Router();
const cartControllers = require("../controller/cart.controller");
const { verifyToken } = require("../middleware/auth.middleware");

cartRouter.route("/products").get(verifyToken, cartControllers.getCartProducts);
cartRouter
  .route("/product/add/:id")
  .post(verifyToken, cartControllers.addtoCart);
cartRouter
  .route("/product/remove/:id")
  .delete(verifyToken, cartControllers.removeFromCart);
cartRouter.route("/:id").get(cartControllers.cartDetails);

module.exports = cartRouter;
