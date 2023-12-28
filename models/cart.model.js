const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      product_id: String,
      title: String,
      description: String,
      thumbnail: String,
      category: String,
      price: Number,
      rating: String,
      category: String,
    },
  ],
});

// define the model and collection name
const Cart = new mongoose.model("Cart", cartSchema);
module.exports = Cart;
