const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { getUsers } = require("../controllers/usersController");

router.get("/", verifyToken, getUsers);
// router.get("/", getUsers);

module.exports = router;
