const express = require("express");
const userController = require("./../controllers/user.controller");
const authController = require("./../controllers/auth.controller");

const router = express.Router();

router.route("/api/users").get(userController.list);

router
  .route("/api/users/:userId")
  .get(authController.isAuthenticated, userController.read)
  .put(
    authController.isAuthenticated,
    authController.isAuthorized,
    userController.update
  )
  .delete(
    authController.isAuthenticated,
    authController.isAuthorized,
    userController.remove
  );

router
  .route("/api/:userId/orders")
  .get(
    authController.isAuthenticated,
    authController.isAuthorized,
    userController.purchaseHistory
  );
router.param("userId", userController.userById);

module.exports = router;
