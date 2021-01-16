let mongoose = require("mongoose");

let operationsSchema = new mongoose.Schema({
  concept: String,
  amount: Number,
  date: Date,
  type: String,
  category: String,
});

module.exports = mongoose.model("operations", operationsSchema);
