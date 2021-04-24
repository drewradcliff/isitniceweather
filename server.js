const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="preconnect" href="https://fonts.gstatic.com">
      <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="style.css">
      <title>Is it nice weather?</title>
    </head>
    <body>
      <script src="script.js"></script>
    </body>
    </html>
  `);
});

app.get("/forecast", (req, res) => {
  fetch(
    `http://api.weatherapi.com/v1/current.json?` +
      `key=${process.env.API_KEY}` +
      `&q=${req.query.lat},${req.query.lon}&aqi=no`
  )
    .then((response) => response.json())
    .then((data) => res.send(data))
    .catch((error) => console.error("Could not get forcast data"));
});

app.use(express.static("public"));

app.listen(process.env.PORT || port, () => {
  console.log(`Server running...`);
});
