const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.get("/client/:userId", async function (req, res) {
  try {
    const userId = req.params.userId;

    const getClientDetails = await prisma.client.findUnique({
      where: { id: parseInt(userId) },
    });
    res.status(200).json(getClientDetails);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
