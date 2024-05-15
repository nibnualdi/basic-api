const express = require("express");
const router = express.Router();

const loginOnly = require("../middleware/loginOnly");
const { create, update, remove, show, index } = require("../controller/userController");

router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);
router.get("/", [loginOnly], show);
router.get("/:id", index);

module.exports = router;
