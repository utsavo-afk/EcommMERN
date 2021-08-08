const mongoose = require("mongoose");
const cartItemSchema = require("./cartItem.model");

const orderSchema = new mongoose.Schema(
  {
    products: [cartItemSchema],
    transaction_id: {
      type: String,
      required: "Transaction Id is required",
    },
    amount: { type: Number },
    address: {
      type: String,
    },
    status: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
    },
    updated_status: Date,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
