const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.get("/client/:transactionId", async function (req, res) {
  try {
    const transactionId = req.params.transactionId;

    const getRating = await prisma.rating.findFirst({
      where: { transaction_id: parseInt(transactionId) },
    });
    res.status(200).json(getRating);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
