const express = require("express");
const Students = require("../models/campsite");

const internetChartRouter = express.Router();

internetRouter.route("/internet").get(async (req, res) => {
  Students.find(internet)

    .then((students) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(campsites);
    })
    .catch((err) => next(err));

  res.send({
    average: 200,
  });
});

//
//

module.exports = internetChartRouter;
