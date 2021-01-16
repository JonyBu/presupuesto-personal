require("./backend/database");
require("dotenv").config();

var cors = require('cors')
 
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3001;

const operations = require("./backend/controller/operationsController");
const users = require("./backend/controller/userController");

app.use("/api", operations);
app.use("/api", users);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
