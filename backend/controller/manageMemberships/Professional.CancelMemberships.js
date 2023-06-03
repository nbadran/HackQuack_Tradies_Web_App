const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.delete("/professional/:userId", async function (req, res) {
  try {
    const {userId} = req.params;
    const deleteClientMemberships = await prisma.membership.deleteMany({
      where: {
        professional: { id: parseInt(userId) },
      },
    });
    res.status(200).json(deleteClientMemberships);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
