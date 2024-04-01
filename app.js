const express = require("express");
const app = express();
const path = require("path");

const gameEventsHandler = require("./bingo");

app.use(express.static("views"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/home.html");
});

const PORT = process.env.PORT || 5000;

var server = app.listen(PORT, console.log(`Server started on port ${PORT}`));

gameEventsHandler(server);
