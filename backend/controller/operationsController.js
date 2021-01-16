const express = require("express");
const router = express.Router();

const operationsModel = require("../model/operationsModel");

router.post("/operations/create", (req, res) => {
  console.log(req.body);
  var newModel = new operationsModel({
    concept: req.body.concept,
    amount: req.body.amount,
    date: Date.now(),
    type: req.body.type,
    category: req.body.category,
  });
  newModel.save().then(function (datos) {
    return res.send(datos);
  });
});

router.put(`/operations/update/:_id`, async (req, res) => {
  console.log(req.body);
  console.log(req.params._id);
  const id = req.params._id;
  await operationsModel
    .updateOne(
      { _id: id },
      {
        $set: {
          concept: req.body.concept,
          amount: req.body.amount,
          date: Date.now(),
          type: req.body.type,
          category: req.body.category,
        },
      }
    )
    .then(() => {
      return res.status(200).json({
        message: "Update succesful ",
      });
    })
    .catch((err) => console.log(err));
});

router.delete("/operations/delete", (req, res) => {
  var newModel = new operationsModel({
    _id: req.body._id,
  });
  newModel
    .deleteOne()
    .then((datos) => {
      return res.send(datos);
    })
    .catch((error) => {
      console.error(error);
    });
});

router.get("/operations", (req, res) => {
  operationsModel
    .find()
    .then((datos) => {
      return res.send(datos);
    })
    .catch((error) => {
      console.error(error);
    });
});

module.exports = router;
