const express = require("express");
const productRouter = express.Router();
const productController = require("../controller/product.controller");
const { verifyToken } = require("../middleware/auth.middleware");

productRouter.route("/").post(productController.addtoProduct);
productRouter.route("/").get(productController.getProducts);
productRouter.route("/:id").get(productController.getProductById);

module.exports = productRouter;
