const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const authentication = require("./controller/authentication/index");
const membership = require("./controller/manageMemberships/index");
const serviceRequest = require("./controller/serviceRequest/index");
const viewServiceTypes = require("./controller/Servicetypes/index");
const ratingAndReview = require("./controller/ratingAndReview");
const userControl = require("./controller/userControl/index");
const transaction = require("./controller/transaction/index");

const app = express();

app.use(cors());
app.use(express.json());

// ---Routes---
app.get("/", function (req, res) {
  res.send("Welcome to HackQuackApp Backend");
});

app.use("/", authentication);
app.use("/membership", membership);
app.use("/service", serviceRequest);
app.use("/service-types", viewServiceTypes);
app.use("/rating-review", ratingAndReview);
app.use("/user", userControl);
app.use("/transaction", transaction);

// Port
app.listen(port, () => {
  console.log("Server is running on port: ", port);
});
