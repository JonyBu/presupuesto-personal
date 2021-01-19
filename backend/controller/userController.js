const express = require("express");
const router = express.Router();

const usersModel = require("../model/usersModel");

const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/user/signin", async (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  const user = await usersModel.findOne({
    name,
    email,
  });
  if (user)
    return res.status(400).json({
      error: true,
      message: "ya registrado",
    });

  const hash = bcrypt.hashSync(password, saltRounds);
  var newModel = new usersModel({
    name: req.body.name,
    email: req.body.email,
    password: hash,
  });
  newModel
    .save()
    .then((datos) => res.send(datos))
    .catch((err) => console.error(err));
});

router.post("/user/login", async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  const user = await usersModel.findOne({
    email,
  });
  if (!user)
    return res.status(400).json({
      error: true,
      message: "no registrado",
    });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).json({
      error: true,
      message: "no registrado",
    });
  else {
    res.send(user.name)
  }
});

module.exports = router;
