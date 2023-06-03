const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.post("/professional", async function (req, res) {
  try {
    const { professional_id, cost } = req.body;

    const date = new Date();

    const subs = await prisma.membership.create({
      data: {
        cost: parseFloat(cost),
        professional: { connect: { id: parseInt(professional_id) } },
        start_date: date,
        due_date: new Date(date.setFullYear(date.getFullYear() + 1)),
      },
    });
    res.status(200).json(subs);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
