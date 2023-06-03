const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.post("/new-request", async function (req, res) {
  try {
    const {client_id, request_title, service_type_id, description } =
      req.body;

    const clientNewRequest = await prisma.service_request.create({
      data: {
        client_id:parseInt(client_id),
        request_title,
        service_type_id:parseInt(service_type_id),
        request_time: new Date(),
        description,
      },
    });

    res.json(clientNewRequest);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
