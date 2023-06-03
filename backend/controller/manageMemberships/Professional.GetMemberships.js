const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.get("/professional/:userId", async function (req, res) {
  const userId = req.params.userId;
  try {
    const getMemberships = await prisma.membership.findFirst({
      where: {
        professional_id: parseInt(userId),
      },
    });
    res.status(200).json(getMemberships);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
