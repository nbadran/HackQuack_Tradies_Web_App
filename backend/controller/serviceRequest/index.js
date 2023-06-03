const express = require("express");
const router = express.Router();

const clientNewRequest = require("./Client.NewRequest");
const professionalNewOffer = require("./Professional.NewOffer");
const clientGetAllProfessionalOffer = require("./Client.GetAllProfessionalOffer");
const professionalGetClientRequest = require("./Professional.GetClientRequest");
const getAllClientRequests = require("./Client.GetAllRequest");
const cancelRequest = require("./Client.CancelRequest");
const professionalGetAllOffer = require("./Professional.GetAllOffer");
const professionalCancelOffer = require("./Professional.CancelOffer");
const clientAcceptOffer = require("./Client.AcceptOffer");
const getActiveRequest = require("./Client.GetActiveRequest");
const getActiveService = require("./Professional.GetActiveService");
const finishService = require("./Professional.FinishService");
const clientGetPastService = require("./Client.GetPastService");
const professionalGetPastService = require("./Professional.GetPastService");

router.use("/client", clientNewRequest);
router.use("/professional", professionalNewOffer);
router.use("/client", clientGetAllProfessionalOffer);
router.use("/professional", professionalGetClientRequest);
router.use("/client", getAllClientRequests);
router.use("/client", cancelRequest);
router.use("/professional", professionalGetAllOffer);
router.use("/professional", professionalCancelOffer);
router.use("/client", clientAcceptOffer);
router.use("/client", getActiveRequest);
router.use("/professional", getActiveService);
router.use("/professional", finishService);
router.use("/client", clientGetPastService);
router.use("/professional", professionalGetPastService);

module.exports = router;
