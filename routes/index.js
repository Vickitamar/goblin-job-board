const express = require("express");
const router = express.Router();
const usersRoute = require("./usersRoute");
const jobRoute = require("./jobRoute");

router.use("/", usersRoute);
router.use("/", jobRoute);

module.exports = router;
