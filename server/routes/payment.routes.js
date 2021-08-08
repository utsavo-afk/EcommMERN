const express = require("express");
const userController = require("./../controllers/user.controller");
const authController = require("./../controllers/auth.controller");
const paymentController = require("./../controllers/payment.controller");

const router = express.Router();

router
  .route("/api/payments/:userId")
  .get(
    authController.isAuthenticated,
    authController.isAuthorized,
    paymentController.generateToken
  )
  .post(
    authController.isAuthenticated,
    authController.isAuthorized,
    paymentController.processPayment
  );
router.param("userId", userController.userById);

module.exports = router;
