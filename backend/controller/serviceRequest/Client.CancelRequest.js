const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.delete("/cancel-request/:requestId", async function (req, res) {
  try {
    const requestId = req.params.requestId;
    await prisma.professional_service_request.deleteMany({
      where: {
        service_request: { id: parseInt(requestId) },
        transaction: undefined,
      },
    });
    const cancelOffer = await prisma.service_request.delete({
      where: { id: parseInt(requestId) },
    });
    res.status(200).json(cancelOffer);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
