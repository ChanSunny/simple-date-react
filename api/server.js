const express = require("express");
const app = express();
const cors = require("cors");

async function getData() {
  const url = "https://worldtimeapi.org/api/timezone/America/New_York";
  const response = await fetch(url);
  return await response.json();
}

app.use(cors());

app.get("/", function (req, res) {
  res.send(getData());
});

app.listen(3000, () => {
  console.log("app listening on port 3000");
});

