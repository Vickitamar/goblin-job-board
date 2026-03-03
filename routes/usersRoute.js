const express = require("express");
const router = express.Router();
const { postUsers, getUsers } = require("../controllers/userController");

router.get("/users", getUsers);
router.post("/users", postUsers);

module.exports = router;
