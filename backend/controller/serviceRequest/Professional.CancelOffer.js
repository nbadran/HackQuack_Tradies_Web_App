const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.delete("/cancel-offer/:offerId", async function (req, res) {
  try {
    const offerId = req.params.offerId;
    const cancelOffer = await prisma.professional_service_request.deleteMany({
      where: {
        id: parseInt(offerId),
        transaction: undefined,
      },
    });
    res.status(200).json(cancelOffer);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
