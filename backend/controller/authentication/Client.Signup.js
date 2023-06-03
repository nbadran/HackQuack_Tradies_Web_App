const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.post("/client", async function (req, res) {
  try {
    const {
      first_name,
      last_name,
      email,
      phone,
      password,
      address,
      suburb,
      state,
      postcode,
      cardNumber,
      expiry,
      CVV,
    } = req.body;

    const getEmail = await prisma.client.findMany({
      where: {
        email,
      },
    });
    if (getEmail.length !== 0) {
      return res.status(409).json({ message: "Email already exist" });
    }

    const signupClient = await prisma.client.create({
      data: {
        first_name,
        last_name,
        email,
        address,
        phone,
        password,
        suburb,
        state,
        postcode,
        card_number: cardNumber,
        card_security_num: CVV,
        card_expiry_date: new Date(expiry),
      },
    });
    res.status(200).json(signupClient);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
