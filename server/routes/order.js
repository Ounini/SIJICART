const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  getUserOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
// const { verifyAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.get("/user/:userId", getUserOrders);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
