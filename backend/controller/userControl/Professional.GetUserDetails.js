const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.get("/professional/:userId", async function (req, res) {
  try {
    const userId = req.params.userId;
    const getProfessionalDetails = await prisma.professional.findUnique({
      where: { id: parseInt(userId) },
      include: { service_type: true },
    });
    res.status(200).json(getProfessionalDetails);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
