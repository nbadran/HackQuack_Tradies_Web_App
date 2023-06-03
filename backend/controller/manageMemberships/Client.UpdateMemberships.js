const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.put("/client/:userId", async function (req, res) {
  const userId = req.params

  try {
    const getCurrentDueDate = await prisma.membership.findFirst({
      where: { client_id: parseInt(userId) },
    });

    const updateDueDate = new Date(
      getCurrentDueDate.due_date.setFullYear(
        getCurrentDueDate.due_date.getFullYear() + 1
      )
    );

    const renewCLientMembership = await prisma.membership.update({
      where: {
        id: getCurrentDueDate.id,
      },
      data: {
        due_date: updateDueDate,
      },
    });
    res.status(200).json(renewCLientMembership);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
