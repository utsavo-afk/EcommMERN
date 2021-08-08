const Order = require("./../models/order.model");

const create = async (req, res, next) => {
  req.body.user = req.profile;
  const order = new Order(req.body);
  try {
    await order.save();
    return res.status(200).send(order);
  } catch (error) {
    next(error);
  }
};

const list = async (req, res) => {
  try {
    let orders = await Order.find({})
      .populate("user", "_id name")
      .sort("-createdAt")
      .exec();
    return res.status(200).send({ orders, orderCount: orders?.length });
  } catch (error) {
    return res.status(400).send({ error: "Failed to fetch orders" });
  }
};

const orderById = async (req, res, next, id) => {
  try {
    let order = await Order.findById(id)
      .populate("user", "_id name")
      .populate("product", "_id product_name price")
      .exec();
    if (!order) return res.status(404).send({ error: "Order not found" });
    req.order = order;
    next();
  } catch (error) {
    next(error);
  }
};

const read = (req, res) => {
  return res.status(200).send(req.order);
};

const getOrderStatus = async (req, res) => {
  try {
    let statusOptions = await Order.schema.path("status").enumValues;
    return res.status(200).send(statusOptions);
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  let order = req.order;
  try {
    let result = await Order.findByIdAndUpdate(
      { _id: order._id },
      { $set: { status: req.body.status } },
      { new: true }
    );
    return res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  list,
  orderById,
  read,
  getOrderStatus,
  updateOrderStatus,
};
