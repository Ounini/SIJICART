const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductByCategory,
  incrementCarted,
  getPopularProducts,
  addReviewsToProduct,
  incrementView,
  getViewedProducts,
} = require("../controllers/productController");
const { upload } = require("../middlewares/cloudinaryMiddleware");

router.post("/", upload.array("images", 5), createProduct);
router.get("/search", getProductByCategory);
router.patch("/carted/:id", incrementCarted);
router.get("/carted", getPopularProducts);

router.patch("/viewed/:id", incrementView);
router.get("/viewed", getViewedProducts);

router.get("/", getProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/:id", getProductById);
router.post("/productReview/:id", addReviewsToProduct);

module.exports = router;
