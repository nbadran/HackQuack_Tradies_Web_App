const express = require("express");
const router = express.Router();

const viewServiceTypes = require("./GetAllServiceTypes");

router.use("/", viewServiceTypes);

module.exports = router;
