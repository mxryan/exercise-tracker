const express = require("express");
const mongoose = require("mongoose");
const db = require("./models");
const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect("mongodb://localhost/exercise_tracker", {
  useNewUrlParser: true
});

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.get("/", (req, res) => {
  res.sendFile("public/index.html");
});

app.post("/api/exercise/new-user", (req, res) => {
  db.User.findOne({
    username: req.body.username
  }, (err, result) => {
    if (err) {
      res.status(500).send({
        error: err
      });
      return console.log(err);
    }
    if (result) {
      res.status(409).send({
        message: "Username already exists"
      });
      console.log(result);
    } else {
      const user = new db.User({
        username: req.body.username
      });
      console.log(user);
      user.save((saveErr, savedUser) => {
        if (saveErr) {
          res.status(500).send({
            error: saveErr
          })
          return console.log(saveErr);
        }
        res.status(201).send({
          data: savedUser
        })
      });
    }
  })



});

app.post("/api/exercise/add", (req, res) => {
  console.log(req.body);
  const msg = {
    msg: "You hit '/api/exercise/add' and this is what you sent me",
    ...req.body
  }
  res.json(msg);
});

app.listen(PORT, () => console.log("Server is listening"));