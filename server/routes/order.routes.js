const express = require("express");
const authController = require("./../controllers/auth.controller");
const userController = require("./../controllers/user.controller");
const orderController = require("./../controllers/order.controller");
const productController = require("./../controllers/product.controller");

const router = express.Router();

router
  .route("/api/:userId/order/:orderId")
  .get(
    authController.isAuthenticated,
    authController.isAuthorized,
    authController.isAdmin,
    orderController.read
  )
  .put(
    authController.isAuthenticated,
    authController.isAuthorized,
    authController.isAdmin,
    orderController.updateOrderStatus
  );

router
  .route("/api/orders/:userId")
  .get(
    authController.isAuthenticated,
    authController.isAuthorized,
    authController.isAdmin,
    orderController.list
  )
  .post(
    authController.isAuthenticated,
    authController.isAuthorized,
    userController.addOrderToUserHistory,
    productController.updateInventory,
    orderController.create
  );

router
  .route("/api/:userId/orders/getStatusValues")
  .get(
    authController.isAuthenticated,
    authController.isAuthorized,
    authController.isAdmin,
    orderController.getOrderStatus
  );

router.param("userId", userController.userById);
router.param("orderId", orderController.orderById);

module.exports = router;
