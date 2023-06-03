const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.get("/get-past-service/:userId", async function (req, res) {
  try {
    const userId = req.params.userId;
    const getPastService = await prisma.transaction.findMany({
      where: {
        professional_service_request: {
          professional_id: parseInt(userId),
        },
        NOT: {
          payment_time: null,
        },
      },
      include: {
        professional_service_request: {
          select: {
            service_request: {
              select: {
                service_type: true,
                client: true,
                description: true,
                request_title: true,
                request_time: true,
              },
            },
            professional: true,
          },
        },
      },
    });
    res.status(200).json(getPastService);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
