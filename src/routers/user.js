const express = require("express");
const router = express.Router();

const { create, update, remove, show, index } = require("../controller/userController");

router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);
router.get("/", show);
router.get("/:id", index);

module.exports = router;
