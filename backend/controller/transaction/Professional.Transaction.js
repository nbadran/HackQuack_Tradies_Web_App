const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.get("/professional/:userId", async function (req, res) {
  try {
    const userId = req.params.userId;
    const getTransaction = await prisma.transaction.findMany({
      where: {
        professional_service_request: { professional_id: parseInt(userId) },
        NOT: {
          payment_time: null,
        },
      },
      include: {
        professional_service_request: {
          select: {
            professional: true,
            cost: true,
            service_request: {
              include: {
                client: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json(getTransaction);
  } catch (err) {
    throw err;
    res.status(500).json(err);
  }
});

module.exports = router;
