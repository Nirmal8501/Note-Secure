const express = require("express");
const {
  registerUser,
  authUser,
  updateUserProfile,
} = require("../controller/userController");
const { protect } = require("../middleware/authMw");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").post(protect, updateUserProfile);

module.exports = router;
