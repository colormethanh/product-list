const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const {ResponseMessages} = require("./utility/responseHelpers");

mongoose.connect("mongodb://localhost/products");

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const mainRoutes = require("./routes/main");

app.use(mainRoutes);

app.use((err, req, res, next) => {
  res.status(500).send(ResponseMessages[500]);
});

app.listen(8000, () => {
  console.log("Node.js listening on port " + 8000);
});
