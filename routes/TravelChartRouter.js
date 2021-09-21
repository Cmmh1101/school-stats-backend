const express = require("express");

const travelChartRouter = express.Router();

travelChartRouter.route("/traveltime").get(async (req, res) => {
  const mongoClient = await MongoClient.connect(MONGO_URI, {
    useNewUrlParser: true,
  });
  const db = await mongoClient.db("src");
  const dataCollection = await db.collection("data");

  const stats = await dataCollection.aggregate([
    {
      $group: {
        _id: "$traveltime",
        avgGrade: { $avg: "$G3" },
      },
    },
  ]);

  //   { labels: Array, values: Array }
  const labels = [];
  const values = [];

  await stats.forEach((stat) => {
    labels.push(stat._id);
    values.push(stat.avgGrade);
  });

  //   res.send(await stats.toArray());
  res.json({
    labels,
    values,
  });
});

module.exports = travelChartRouter;
