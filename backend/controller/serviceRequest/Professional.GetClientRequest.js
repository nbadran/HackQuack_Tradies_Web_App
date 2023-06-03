const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.get("/view-all-offers/:professional_id", async function (req, res) {
  try {
    const { professional_id } = req.params;

    const getProfessionalServiceTypeId = await prisma.professional.findFirst({
      where: {
        id: parseInt(professional_id),
      },
    });
    const viewAllActiveRequest = await prisma.service_request.findMany({
      where: {
        professional_service_request: {
          every: {
            professional_id: parseInt(professional_id),
            acceptance: null,
          },
        },
        service_type: {
          id: getProfessionalServiceTypeId.service_type_id,
        },
      },
      include: { client: true, service_type: true },
    });

    res.json(viewAllActiveRequest);
  } catch (err) {
    res.status(err);
  }
});

module.exports = router;
