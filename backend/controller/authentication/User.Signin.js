const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

router.post("/", async function (req, res) {
  try {
    const { loginUserType, loginEmail, loginPassword } = req.body;

    if (!loginEmail || !loginPassword) {
      res.status(403).json({ message: "Provide all inputs" });
    }

    if (loginUserType === "customer") {
      const signinCustomer = await prisma.client.findFirst({
        where: {
          email: loginEmail,
          password: loginPassword,
        },
      });

      if (!signinCustomer) {
        res.status(403).json({ message: "Invalid credentials" });
      }

      res
        .status(200)
        .json({
          userId: signinCustomer.id,
          userType: 0,
          firstName: signinCustomer.first_name,
          lastName: signinCustomer.last_name,
        });
    }

    if (loginUserType === "professional") {
      const signinProfessional = await prisma.professional.findFirst({
        where: {
          email: loginEmail,
          password: loginPassword,
        },
      });
      if (!signinProfessional) {
        res.status(403).json({ message: "Invalid credentials" });
      }
      res.status(200).json({
        userId: signinProfessional.id,
        userType: 1,
        firstName: signinProfessional.first_name,
        lastName: signinProfessional.last_name,
      });
    }

    res.status(404).json({ message: "User type invalid" });
  } catch (err) {
    res.status(err);
  }
});

module.exports = router;
