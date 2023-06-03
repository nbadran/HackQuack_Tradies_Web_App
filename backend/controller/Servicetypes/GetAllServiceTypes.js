const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async function (req, res) {
  try {
    const getAllServiceTypes = await prisma.service_type.findMany();
    res.status(200).json(getAllServiceTypes);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
