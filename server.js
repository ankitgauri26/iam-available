const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const app = express();
dotenv.config(); // to pull local configuration from .env file

// setup your routes here
const users = require("./routes/users");
const updateAvailibility = require("./routes/updateAvailability");
const getAllData = require("./routes/getAllData");
const validateUser = require("./routes/validateUser");
const logoutAndDelete = require("./routes/logoutAndDelete");

// setup your middlewares here
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup your route definations
app.use("/users", users);
app.use("/updateAvailability", updateAvailibility);
app.use("/getAllData", getAllData);
app.use("/validateUser", validateUser);
app.use("/logoutAndDelete", logoutAndDelete);

// Serve static files assets on heroku
if (process.env.NODE_ENV === "production") {
  //   app.use(express.static("client/build"));

  //   // PATH CONFIGURATION TO RESPOND TO A REQUEST TO STATIC ROUTE REQUEST BY SERVING index.html
  //   app.get("/*", function (req, res) {
  //     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  //   });
  let root = path.join(__dirname, "client", "build");
  app.use(express.static(root));
  app.use(function (req, res, next) {
    if (
      req.method === "GET" &&
      req.accepts("html") &&
      !req.is("json") &&
      !req.path.includes(".")
    ) {
      res.sendFile("index.html", { root });
    } else next();
  });
}

// MongoDB connection string
const MONGODB_LOCAL = "mongodb://localhost:27017/updateMyAvailibility";

mongoose
  .connect(process.env.MONGOLAB_URI || MONGODB_LOCAL)
  .then(() => console.log("New connection established"))
  .catch((err) => console.log("Something went wrong" + err));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
