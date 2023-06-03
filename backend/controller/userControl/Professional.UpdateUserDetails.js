const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.put("/professional/:userId", async function (req, res) {
  const {
    first_name,
    last_name,
    abn,
    password,
    suburb,
    state,
    address,
    postcode,
    card_number,
    card_security_num,
    card_expiry_date,
    service_type_id,
  } = req.body;

  // Parse and validate the id parameter
  const id = parseInt(req.params.userId);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid professional id" });
  }

  try {
    // Find the professional by id
    const professional = await prisma.professional.findUnique({
      where: { id: id },
    });

    // If the professional does not exist, return an error
    if (!professional) {
      return res
        .status(404)
        .json({ status: "error", message: "Professional not found" });
    }

    // If all checks pass, update the professional's data
    const updatedProfessional = await prisma.professional.update({
      where: { id: id },
      data: {
        first_name: first_name,
        last_name: last_name,
        abn: abn,
        password: password,
        suburb: suburb,
        state: state,
        address: address,
        postcode: postcode,
        card_number: card_number,
        card_security_num: card_security_num,
        card_expiry_date: new Date(card_expiry_date),
        service_type_id: service_type_id,
        failed_update_count: professional.failed_update_count,
        failed_update_timestamp: professional.failed_update_timestamp,
      },
    });

    // Return the updated professional data
    res.status(200).json(updatedProfessional);
  } catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
