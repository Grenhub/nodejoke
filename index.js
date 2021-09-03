const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const fs = require("fs");

app.use(express.json());
app.use(express.static("../public"));

function getJokes() {
  try {
    return JSON.parse(fs.readFileSync("joke.json"));
  } catch {
    return [];
  }
}

app.post("/api/joke", (req, res) => {
  try {
    let raw = fs.readFileSync("joke.json");
    let yourJokes = JSON.parse(raw);
    let joke = yourJokes.some((c) => c.yourJoke === req.body.yourJoke);
    if (req.body && req.body.yourJoke && !joke) {
      yourJokes.push(req.body);
      console.log(yourJokes);
      fs.writeFileSync("joke.json", JSON.stringify(yourJokes));
    }
    res.json(true);
  } catch (err) {
    res.json({ status: "We weren't able to save that joke" });
  }
});

app.get("/api/joke", (req, res) => {
  try {
    res.json(getJokes());
  } catch (err) {
    res.json({
      status: "Too wet here, need more dry jokes and they're not here",
    });
  }
});

app.listen(port, () => console.log(`Localhost running on: ${port}`));
app.use(express.static(path.join(__dirname, "public")));
