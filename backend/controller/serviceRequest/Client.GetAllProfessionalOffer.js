const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.get("/view-offers/:requestId", async function (req, res) {
  try {
    const { requestId } = req.params;
    const getAllActive = await prisma.professional_service_request.findMany({
      where: {
        service_request: { id: parseInt(requestId) },
        acceptance: 1,
      },
      include: { professional: true },
    });

    const data = await Promise.all(
      getAllActive.map(async (item) => {
        const getProfessionalRating = await prisma.rating.findMany({
          where: {
            transaction: {
              professional_service_request: {
                professional_id: item.professional_id,
              },
            },
          },
        });
        const sum = getProfessionalRating.reduce(
          (partialSum, a) => partialSum + a,
          0
        );
        return {
          ...item,
          professional_rating: sum / getProfessionalRating.length || 0,
        };
      })
    );

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
