const express = require("express");
const cors = require("cors");
const { Sequelize, Model } = require("sequelize");

const app = express();

const db = require('./models');
db.sequelize.sync();

var corsOptions = {
  origin: "http://localhost:3000",
  optionSuccessStatus: 200
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to nmarmelo application." });
});

// Define routes
require("./routes/chromebook.routes")(app);
require("./routes/location.routes")(app);
require("./routes/transaction.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
