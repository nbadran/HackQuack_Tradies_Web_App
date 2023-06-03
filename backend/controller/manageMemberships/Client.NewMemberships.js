const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.post("/client", async function (req, res) {
  try {
    const { client_id, cost } = req.body;

    const date = new Date();

    const subs = await prisma.membership.create({
      data: {
        cost: parseFloat(cost),
        client: { connect: { id: parseInt(client_id) } },
        start_date: new Date(),
        due_date: new Date(date.setFullYear(date.getFullYear() + 1)),
      },
    });
    res.status(200).json(subs);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
