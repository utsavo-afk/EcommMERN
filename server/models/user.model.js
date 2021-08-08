const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [3, "Name must be at least 3 characters long"],
      maxLength: 32,
      requierd: "Name is required",
      trim: true,
    },
    email: {
      type: String,
      required: "Email is required",
      unique: "Email must be unique, {VALUE} is already registered",
    },
    password: {
      type: String,
      required: "Password is required",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    order_history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);

userSchema.pre("save", async function (next) {
  const user = this;
  try {
    if (!user.password) {
      throw new Error("Password cannot be blank");
    }
    if (user.isNew || (!user.isNew && user.isModified("password"))) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    next();
  } catch (error) {
    return res.status(400).send({ error });
  }
});

userSchema.methods = {
  authenticate: async function (plainText) {
    if (!plainText) {
      return "";
    }
    try {
      let isMatch = await bcrypt.compare(plainText, this.password);
      return isMatch;
    } catch (error) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
