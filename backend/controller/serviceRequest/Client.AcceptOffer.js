const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.post("/accept-offer/:offerId", async function (req, res) {
  try {
    const offerId = req.params.offerId;
    const getRequestId = await prisma.professional_service_request.findFirst({
      where: { id: parseInt(offerId) },
    });
    const acceptOffer = await prisma.transaction.create({
      data: {
        professional_request_id: parseInt(offerId),
      },
    });
    res.status(200).json(acceptOffer);
    console.log(acceptOffer);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
