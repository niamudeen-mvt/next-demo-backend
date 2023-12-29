const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

const getCartProducts = async (req, res) => {
  try {
    const userId = req.params.id;
    // Find the user's cart or create a new one if it doesn't exist
    const cartProducts = await Cart.findOne({ userId });

    if (cartProducts) {
      res.status(200).send({
        success: true,
        cart: cartProducts,
        message: "Cart found successfully",
      });
    } else {
      res.status(200).send({
        success: false,
        message: "no cart data found",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error });
  }
};

const addtoCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const product_id = req.params.id;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    const isProductExist = cart.products.findIndex(
      (product) => product._id == product_id
    );

    if (isProductExist > -1) {
      return res.status(200).send({
        success: true,
        message: "Product already exist",
      });
    } else {
      const product = await Product.findOne({ _id: product_id });
      cart.products = [...cart.products, product];
      await cart.save();
      res.status(201).send({
        success: true,
        message: "Product added successfully",
        cartCount: cart.products.length,
      });
    }
  } catch (error) {
    console.log(error, "error");
    res.status(500).send({ message: error });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const product_id = req.params.id;

    // Find the user's cart or create a new one if it doesn't exist
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(400).send({
        success: false,
        message: "No Cart Found",
      });
    } else {
      const filterdList = cart?.products.filter(
        (item) => item._id != product_id
      );

      cart.products = filterdList;
      await cart.save();

      res.status(200).send({
        success: true,
        message: "Product removed successfully",
        cartCount: filterdList.length,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

module.exports = { addtoCart, removeFromCart, getCartProducts };
