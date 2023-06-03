const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.put("/client/:userId", async function (req, res) {
  const id = req.params.userId;
  const {
    first_name,
    last_name,
    email,
    phone,
    address,
    password,
    suburb,
    state,
    postcode,
    card_number,
    card_security_num,
    card_expiry_date,
  } = req.body;

  try {
    const existingClient = await prisma.client.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!existingClient) {
      return res.status(404).json({ error: "Client not found" });
    }

    const updatedClient = await prisma.client.update({
      where: { id: parseInt(id) },
      data: {
        first_name,
        last_name,
        email,
        phone,
        password,
        suburb,
        address,
        state,
        postcode,
        card_number,
        card_security_num,
        card_expiry_date,
      },
    });
    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the client" });
  }
});

module.exports = router;
