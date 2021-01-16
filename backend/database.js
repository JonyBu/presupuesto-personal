const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URI = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@mytinerary.ehihp.mongodb.net/${process.env.NAME_DB}?retryWrites=true&w=majority`;

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.error("Database connection error: ", err);
      });
  }
}

module.exports = new Database();
