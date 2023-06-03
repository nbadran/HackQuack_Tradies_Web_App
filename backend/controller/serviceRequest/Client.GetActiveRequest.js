const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.get("/get-active-request/:userId", async function (req, res) {
  try {
    const userId = req.params.userId;
    const getActiveRequest = await prisma.$queryRaw`
          SELECT DISTINCT sr.*
          FROM service_request sr
          LEFT JOIN professional_service_request psr ON psr.service_request_id = sr.id
          LEFT JOIN transaction t ON t.professional_request_id = psr.id
          WHERE t.id IS NOT NULL AND t.payment_time IS NULL
          AND sr.client_id = ${userId};
          `;

    const data = await Promise.all(
      getActiveRequest.map(async (item) => {
        const getMoreInfo = await prisma.service_request.findUnique({
          where: { id: item.id },
          include: { service_type: true, client: true },
        });
        return {
          ...item,
          service_request:getMoreInfo
        };
      })
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
