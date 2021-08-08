const express = require("express");
const categoryController = require("./../controllers/category.controller");
const authController = require("./../controllers/auth.controller");
const userController = require("./../controllers/user.controller");

const router = express.Router();

router.route("/api/categories").get(categoryController.list);

router
  .route("/api/categories/create/:userId")
  .post(
    authController.isAuthenticated,
    authController.isAdmin,
    categoryController.create
  );

router
  .route("/api/categories/remove/:userId/:categoryId")
  .put(
    authController.isAuthenticated,
    authController.isAdmin,
    categoryController.update
  )
  .delete(
    authController.isAuthenticated,
    authController.isAdmin,
    categoryController.remove
  );

router.param("userId", userController.userById);
router.param("categoryId", categoryController.categoryById);

module.exports = router;
