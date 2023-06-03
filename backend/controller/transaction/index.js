const express = require("express");
const router = express.Router();

const getClientTransaction = require("./Client.Transaction");
const getProfessionalTransaction = require("./Professional.Transaction");

router.use("/", getClientTransaction);
router.use("/", getProfessionalTransaction);

module.exports = router;
