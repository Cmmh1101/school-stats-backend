const express = require("express");

const healthChartRouter = express.Router();

healthChartRouter.route("/health").get(async (req, res) => {
  const mongoClient = await MongoClient.connect(MONGO_URI, {
    useNewUrlParser: true,
  });
  const db = await mongoClient.db("src");
  const dataCollection = await db.collection("data");

  const healthStats = await dataCollection.aggregate([
    {
      $group: {
        _id: "$health",
        avgGrade: { $avg: "$G1" },
      },
    },
  ]);
  const healthStats2 = await dataCollection.aggregate([
    {
      $group: {
        _id: "$health",
        avgGrade: { $avg: "$G2" },
      },
    },
  ]);
  const healthStats3 = await dataCollection.aggregate([
    {
      $group: {
        _id: "$health",
        avgGrade: { $avg: "$G3" },
      },
    },
  ]);

  //   { labels: Array, values: Array }
  const labels = [];
  const values = [];
  const labels2 = [];
  const values2 = [];
  const labels3 = [];
  const values3 = [];

  await healthStats.forEach((stat) => {
    labels.push(stat._id);
    values.push(stat.avgGrade);
  });
  await healthStats2.forEach((stat) => {
    labels2.push(stat._id);
    values2.push(stat.avgGrade);
  });
  await healthStats3.forEach((stat) => {
    labels3.push(stat._id);
    values3.push(stat.avgGrade);
  });

  //   res.send(await stats.toArray());
  res.json({
    labels,
    values,
    labels2,
    values2,
    labels3,
    values3,
  });
});

module.exports = healthChartRouter;
