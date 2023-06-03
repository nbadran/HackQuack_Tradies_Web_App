const express = require("express");
const router = express.Router();

const getClientDetails = require("./Client.GetUserDetails");
const getProfessionalDetails = require("./Professional.GetUserDetails");
const updateClientDetails = require("./Client.UpdateUserDetails");
const updateProfessionalDetauls = require("./Professional.UpdateUserDetails");

router.use("/", getClientDetails);
router.use("/", getProfessionalDetails);
router.use("/", updateClientDetails);
router.use("/", updateProfessionalDetauls);

module.exports = router;
