const express = require("express");
const router = express.Router();

const newRatingAndReview = require("./NewRatingAndReview");
const getRatingAndReview = require("./GetRatingReview");

router.use("/", newRatingAndReview);
router.use("/", getRatingAndReview);

module.exports = router;
