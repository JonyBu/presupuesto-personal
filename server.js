require("./backend/database");

var cors = require('cors')

const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");

if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const app = express();
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'cliente/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'cliente/build', 'index.html'));
});

const port = process.env.PORT || 3001;

const operations = require("./backend/controller/operationsController");
const users = require("./backend/controller/userController");

app.use("/api", operations);
app.use("/api", users);

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("cliente/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "cliente", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
