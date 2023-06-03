const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.get("/get-all-offer/:userId", async function (req, res) {
  try {
    const userId = req.params.userId;
    const getAllOffer = await prisma.professional_service_request.findMany({
      where: {
        professional: { id: parseInt(userId) },
        OR: [{ transaction: { none: {} } }, { service_request: {} }],
        acceptance: 1,
      },
      include: {
        service_request: {
          select: {
            service_type: true,
            client: true,
            request_title: true,
            request_time: true,
            description: true,
          },
        },
      },
    });
    res.status(200).json(getAllOffer);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
