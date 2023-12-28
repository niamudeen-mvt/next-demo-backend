const Product = require("../models/product.model");

// *=================================================
//* PRODUCT ADD LOGIC
// *================================================

const addtoProduct = async (req, res) => {
  try {
    const { title, description, thumbnail, category, price, rating, images } =
      req.body;

    const productDetails = {
      title,
      description,
      thumbnail,
      category,
      price,
      rating,
      images,
    };

    let productCreated = await Product.create(productDetails);

    if (productCreated) {
      res.status(201).send({
        success: true,
        product: productCreated,
        message: "Product created  successfully",
      });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

// *=================================================
//* GET PRODUCTS LOGIC
// *================================================

const getProducts = async (req, res) => {
  try {
    let productList = await Product.find();

    if (productList) {
      res.status(200).send({
        success: true,
        products: productList,
        message: "Products list found  successfully",
      });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    let product = await Product.findOne({ _id: productId });

    if (product) {
      res.status(200).send({
        success: true,
        product: product,
        message: "Product  found  successfully",
      });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

module.exports = { addtoProduct, getProducts, getProductById };
