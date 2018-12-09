const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("public/index.html");
});

app.listen(PORT, () => console.log("Server is listening"));