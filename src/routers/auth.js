const express = require("express");
const router = express.Router();

const { login, register, refreshToken } = require("../controller/authController");

router.post("/login", login);
router.post("/register", register);
router.post("/refresh-token", refreshToken);

module.exports = router;
