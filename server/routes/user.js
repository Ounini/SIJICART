const express = require("express");
const router = express.Router();
const {
  createUser,
  userLogin,
  deleteUser,
  logout,
  getUsers,
  getUserById,
  updateUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
  sendVerificationEmail,
} = require("../controllers/userController");
// const { verifyToken, verifyAdmin } = require("../middlewares/authMiddleware");

router.post("/create", createUser);
router.post("/login", userLogin);
// router.post("/admin-login", verifyAdmin, userLogin);
router.delete("/:id", deleteUser);
router.post("/logout", logout);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.post("/forgotten-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/send-verify-email", sendVerificationEmail);
router.get("/verifyEmail/:token", verifyEmail);

module.exports = router;
