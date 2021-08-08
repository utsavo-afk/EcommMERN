const User = require("./../models/user.model");
const Order = require("./../models/order.model");
const { extend } = require("lodash");

const create = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).send({ error: "Invalid Credentials" });
  }
  try {
    const user = new User(req.body);
    await user.save();
    user.password = undefined;
    user.isAdmin = undefined;
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

const list = async (req, res) => {
  try {
    let users = await User.find({}).select(
      "_id name email order_history createdAt updatedAt"
    );
    return res.status(200).send(users);
  } catch (error) {
    return res.status(400).send({ error: "Failed to list users" });
  }
};

const userById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).send({ error: "User not found" });
    user.password = undefined;
    req.profile = user;
    next();
  } catch (error) {
    next(error);
  }
};

const read = (req, res) => {
  return res.status(200).send(req.profile);
};

const remove = async (req, res) => {
  try {
    const user = req.profile;
    const deletedUser = await user.remove();
    deletedUser.isAdmin = undefined;
    return res.status(202).send(deletedUser);
  } catch (error) {
    return res.status(400).send({ error: "Failed to delete user" });
  }
};

const update = async (req, res, next) => {
  if (!req.body)
    return res.status(400).send({ error: "Invalid data, cannot update" });
  try {
    let user = req.profile;
    user = extend(user, req.body);
    await user.save();
    return res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

const addOrderToUserHistory = async (req, res, next) => {
  let history = [];

  req.body.products.forEach((item) =>
    history.push({
      _id: item._id,
      count: item.count,
      product_name: item.product_name,
      description: item.description,
      quantity: item.quantity,
      transaction_id: req.body.transaction_id,
      amount: req.body.amount,
    })
  );

  try {
    await User.findOneAndUpdate(
      { _id: req.profile._id },
      { $push: { order_history: history } },
      { new: true }
    );
    next();
  } catch (error) {
    res.status(400).send({ error: "Order History was not updated" });
  }
};

const purchaseHistory = async (req, res) => {
  const user = req.profile;
  try {
    let orders = await Order.find({ user: user._id })
      .populate("user", "_id name")
      .sort("-createdAt")
      .exec();
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(400).send({ error: "Could not retrieve order history" });
  }
};

module.exports = {
  create,
  list,
  userById,
  read,
  remove,
  update,
  addOrderToUserHistory,
  purchaseHistory,
};
