const express = require("express");
const productController = require("./../controllers/product.controller");
const userController = require("./../controllers/user.controller");
const authController = require("./../controllers/auth.controller");

const router = express.Router();

router.route("/api/products").get(productController.list);
router
  .route("/api/products/search")
  .get(productController.searchProducts)
  .post(productController.listBySearch);
router.route("/api/products/categories").get(productController.listCategories);
router.route("/api/products/:productId").get(productController.read);
router
  .route("/api/products/photo/:productId")
  .get(productController.fetchPhoto);
router.route("/api/related-products/:productId").get(productController.suggest);
router
  .route("/api/products/:userId")
  .post(
    authController.isAuthenticated,
    authController.isAdmin,
    productController.create
  );
router
  .route("/api/products/:userId/:productId")
  .put(
    authController.isAuthenticated,
    authController.isAdmin,
    productController.update
  )
  .delete(
    authController.isAuthenticated,
    authController.isAdmin,
    productController.remove
  );
router
  .route("/api/products/listAll/:userId")
  .get(
    authController.isAuthenticated,
    authController.isAuthorized,
    authController.isAdmin,
    productController.listAll
  );
router.param("userId", userController.userById);
router.param("productId", productController.productById);

module.exports = router;
