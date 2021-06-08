const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.get("/", function (req, res) {
  console.log("received request");
  res.setHeader("Access-Control-Allow-Origin", "*");

  console.log("query", req.query.market);
  if (req.query.market) {
    fetch(
      //10000948
      `https://www.edeka.de/eh/service/eh/offers?marketId=${req.query.market}&limit=89899`
    )
      .then((data) => data.json())
      .then((json) => {
        res.json(json);
        console.log("passed edeka data");
      });
  } else {
    res.json({});
    console.log("passed empty {}");
  }
});

app.listen(3001);
