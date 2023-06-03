const express = require('express');
const router = express.Router();

const clientSignup = require("./Client.Signup");
const professionalSignup = require("./Professional.Signup");
const signin = require("./User.Signin");

router.use("/signup", clientSignup);
router.use("/signup", professionalSignup);
router.use("/signin", signin);

module.exports = router;
