const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.put("/finish-service/:serviceId", async function (req, res) {
  try {
    const serviceId = req.params.serviceId;
    const getFinishService = await prisma.transaction.update({
      where: { id: parseInt(serviceId) },
      data: {
        payment_time: new Date(),
      },
    });
    res.status(200).json(getFinishService)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
