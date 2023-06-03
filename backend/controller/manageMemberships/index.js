const express = require("express");
const router = express.Router();

const clientNewMembership = require("./Client.NewMemberships");
const professionalNewMembership = require("./Professional.NewMemberships");
const clientUpdateMembership = require("./Client.UpdateMemberships");
const professionalUpdateMembership = require("./Professional.UpdateMemberships");
const clientCancelMembership = require("./Client.CancelMemberships");
const professionalCancelMembership = require("./Professional.CancelMemberships");
const clientGetMembership = require("./Client.GetMemberships");
const professionalGetMembership = require("./Professional.GetMemberships");

router.use("/", clientNewMembership);
router.use("/", professionalNewMembership);
router.use("/", clientUpdateMembership);
router.use("/", professionalUpdateMembership);
router.use("/", clientCancelMembership);
router.use("/", professionalCancelMembership);
router.use("/", clientGetMembership);
router.use("/", professionalGetMembership);

module.exports = router;
