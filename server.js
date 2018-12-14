const express = require("express");
const mongoose = require("mongoose");
const db = require("./models");
const app = express();
const PORT = process.env.PORT || 5000;

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
  });
} else {
  mongoose.connect("mongodb://localhost/exercise_tracker", {
    useNewUrlParser: true
  });
}

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));


function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

app.get("/", (req, res) => {
  res.sendFile("public/index.html");
});

app.post("/api/exercise/new-user", (req, res) => {
  db.User.findOne({ username: req.body.username }, (findErr, foundUser) => {
    if (findErr) {
      res.status(500).send({ error: findErr });
      return console.log(findErr);
    }
    console.log("Found result: ", foundUser);
    if (foundUser) {
      res.status(409).send({ message: "Username already exists" });
      console.log(foundUser);
    } else {
      const user = new db.User({ username: req.body.username });
      user.save((saveErr, savedUser) => {
        if (saveErr) {
          res.status(500).send({ error: saveErr });
          return console.log(saveErr);
        }
        res.status(201).send({ data: savedUser });
      });
    }
  })
});

app.post("/api/exercise/add", (req, res) => {
  console.log(req.body);
  db.User.findOne({_id: req.body.userId}, (err, foundUser) => {
    if (err) {
      res.status(500).send({ error: err });
      return console.log(err);
    }
    if (foundUser) {
      const exercise = new db.Exercise(req.body);
      exercise.save((saveErr, savedExercise) => {
        if (saveErr) {
          res.status(500).send({ error: saveErr });
          return console.log(saveErr);
        }
        res.status(201).send({ data: savedExercise})
      });
    } else {
      res.status(404).send({ message: "That user ID does not exist."});
    }
  })
});

app.get("/api/exercise/log", (req, res) => {
  const {userId, from, to, limit} = req.query;
  const dateQuery = {}
  const queryParams = {userId}
  if (from) dateQuery.$gte = new Date(from);
  if (to) dateQuery.$lte = new Date(to);
  if (!isEmpty(dateQuery)) queryParams.date = dateQuery;
  db.Exercise.find(queryParams, (findErr, foundExercises) => {
    if (findErr) {
      res.status(500).send({error: findErr});
      return console.log(findErr);
    }
    if (foundExercises) {
      res.status(201).send({data: foundExercises});
    } else {
      res.status(404).send({message: "Could not find any entries for that userId"});
    }
  }).limit(parseInt(limit));
})

app.listen(PORT, () => console.log("Server is listening"));