const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const server = express();
const cors = require("cors");
const allQuotes = require("./allQuotes.js");

mongoose
  .connect("mongodb://wisdoms:wisdoms200@ds155634.mlab.com:55634/wisdoms")
  .then(p => {
    console.log("=== connected to ratingDB ==");
  })
  .catch(err => {
    console.log(`err:${err}`);
  });
allQuotes();
server.use(bodyParser.json());
server.use(cors());
const rateRoute = require("./rateRoute.js");
server.use("/ratings", rateRoute);

server.listen(4000, () => {
  console.log("=== server is running on 4000 ===");
});
