const express = require("express");
const productRouter = express.Router();
const productController = require("../controller/product.controller");

productRouter.route("/").post(productController.addtoProduct);
productRouter.route("/").get(productController.getProducts);
productRouter.route("/:id").get(productController.getProductById);

module.exports = productRouter;
