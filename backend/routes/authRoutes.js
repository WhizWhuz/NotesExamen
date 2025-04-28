const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", authController.register);

router.use(authMiddleware);

router.post("/login", authController.login);

module.exports = router;
