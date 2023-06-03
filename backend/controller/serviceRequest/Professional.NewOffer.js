/* Front End: ProfessionalServiceBoardRequestPriceOffer */

const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.post("/new-offer", async function (req, res) {
  try {
    const { acceptance, cost, service_request_id, professional_id } = req.body;

    const acceptRequest = await prisma.professional_service_request.create({
      data: {
        acceptance,
        cost: parseFloat(cost) || null,
        service_request_id: parseInt(service_request_id),
        professional_id,
      },
    });
    res.json(acceptRequest);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
