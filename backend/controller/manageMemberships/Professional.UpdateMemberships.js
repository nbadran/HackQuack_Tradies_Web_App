const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.put("/professional/:userId", async function (req, res) {
  const { professional_id } = req.body;

  try {
    const getCurrentDueDate = await prisma.membership.findFirst({
      where: { professional_id: parseInt(professional_id) },
    });

    const updateDueDate = new Date(
      getCurrentDueDate.due_date.setFullYear(
        getCurrentDueDate.due_date.getFullYear() + 1
      )
    );

    const renewProfessionalMembership = await prisma.membership.update({
      where: {
        id: getCurrentDueDate.id, // The ID of the professional
      },
      data: {
        due_date: updateDueDate,
      },
    });
    res.status(200).json(renewProfessionalMembership);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
