const logger = require("../utils/helpers/logger");
const Category = require("./../models/category.model");
const Product = require("./../models/product.model");
const { extend } = require("lodash");

const create = async (req, res, next) => {
  if (!req.body) return res.status(400).send({ error: "Invalid Category" });
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(200).send(category);
  } catch (error) {
    next(error);
  }
};

const list = async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.status(200).send(categories);
  } catch (error) {
    return res.status(400).send({ error: "Failed to list categories" });
  }
};
const categoryById = async (req, res, next, id) => {
  try {
    const category = await Category.findById(id);
    if (!category) return res.status(400).send({ error: "Category not found" });
    req.category = category;
    next();
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res) => {
  try {
    const category = req.category;
    const deletedCategory = await category.remove();
    await Product.deleteMany({ category: req.category._id });
    return res.status(202).send(deletedCategory);
  } catch (error) {
    return res.status(400).send({ error: "Failed to delete category" });
  }
};

const update = async (req, res, next) => {
  try {
    let category = req.category;
    category = extend(category, req.body);
    await category.save();
    return res.status(200).send(category);
  } catch (error) {
    next(error);
  }
};

module.exports = { create, categoryById, remove, list, update };
