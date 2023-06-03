const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.get("/get-active-service/:userId", async function (req, res) {
  try {
    const userId = req.params.userId;
    const getActiveService = await prisma.transaction.findMany({
      where: {
        professional_service_request: { professional_id: parseInt(userId) },
        payment_time: null,
      },
      include: {
        professional_service_request: {
          select: {
            service_request: {
              select: {
                service_type: true,
                request_time: true,
                request_title: true,
                client: true,
                id:true,
                description:true
              },
            },
            cost: true,
          },
        },
      },
    });
    res.status(200).json(getActiveService);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
