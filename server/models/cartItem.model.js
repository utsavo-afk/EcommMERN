const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    product_name: String,
    price: Number,
    count: Number,
  },
  { timestamps: true }
);

module.exports = cartItemSchema;
