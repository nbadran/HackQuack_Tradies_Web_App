const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.get("/all-request/:userId", async function (req, res) {
  try {
    const userId = req.params.userId;

    const getAllRequest = await prisma.$queryRaw`SELECT sr.*
    FROM service_request sr
    LEFT JOIN professional_service_request psr ON psr.service_request_id = sr.id
    LEFT JOIN transaction t ON t.professional_request_id = psr.id
    WHERE t.id IS NULL
      AND sr.client_id = ${userId}`;

    const data = await Promise.all(
      getAllRequest.map(async (item) => {
        const getMoreInfo = await prisma.service_request.findUnique({
          where: { id: item.id },
          include: { service_type: true, client: true },
        });
        return {
          ...item,
          client: getMoreInfo.client,
          service_type: getMoreInfo.service_type,
        };
      })
    );

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
