const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
  res.sendFile("public/index.html");
});

app.post("/api/exercise/new-user", (req, res) => {
  console.log(req.body);
  const msg = {
    msg: "You hit '/api/exercise/new-user' and this is what you sent me",
    ...req.body
  }
  res.json(msg);
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