const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Category name is required",
      maxLength: 32,
      unique: "Category '{VALUE}' already exists",
    },
  },
  { timestamps: true }
);

categorySchema.plugin(uniqueValidator);

module.exports = mongoose.model("Category", categorySchema);
