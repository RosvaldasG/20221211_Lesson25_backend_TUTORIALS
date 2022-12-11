const express = require("express");
const bodyParser = require("body-parser");
const tutorialsRoutes = require("./api/routes/tutorials");
const usersRoutes = require("./api/routes/user");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

var cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true })
  .then(console.log("connected"))
  .catch((err) => {
    console.log("xxxxxxxxxxxxxxxxxx");
    console.log(err);
  });

app.use(tutorialsRoutes);
app.use(usersRoutes);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
console.log("Hello");
app.listen(3000);
