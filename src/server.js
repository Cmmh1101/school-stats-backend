import express from "express";
var cors = require("cors");
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";

const app = express();
app.use(cors());

// app.use(bodyParser.urlencoded());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const MONGO_URL = "mongodb://76.107.181.181/32";
const MONGO_PASS = "RodolfoJ08-";
const MONGO_URI = `mongodb+srv://mydbuser:${MONGO_PASS}@cluster0.ab4he.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
(async () => {
  const mongoClient = await MongoClient.connect(MONGO_URI, {
    useNewUrlParser: true,
  });
  const db = await mongoClient.db("src");
  const dataCollection = await db.collection("data");
})();

app.get("/internet", async (req, res) => {
  const mongoClient = await MongoClient.connect(MONGO_URI, {
    useNewUrlParser: true,
  });
  const db = await mongoClient.db("src");
  const dataCollection = await db.collection("data");

  const stats = await dataCollection.aggregate([
    {
      $group: {
        _id: "$internet",
        avgGrade: { $avg: "$G3" },
      },
    },
    {
      $sort: { _id: 1 },
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

// traveltime chart
app.get("/traveltime", async (req, res) => {
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
    {
      $sort: { _id: 1 },
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
app.get("/health", async (req, res) => {
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
    {
      $sort: { _id: 1 },
    },
  ]);
  const healthStats2 = await dataCollection.aggregate([
    {
      $group: {
        _id: "$health",
        avgGrade: { $avg: "$G2" },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);
  const healthStats3 = await dataCollection.aggregate([
    {
      $group: {
        _id: "$health",
        avgGrade: { $avg: "$G3" },
      },
    },
    {
      $sort: { _id: 1 },
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

app.get("/famschoolsup", async (req, res) => {
  const mongoClient = await MongoClient.connect(MONGO_URI, {
    useNewUrlParser: true,
  });
  const db = await mongoClient.db("src");
  const dataCollection = await db.collection("data");

  const statsFamSup = await dataCollection.aggregate([
    {
      $group: {
        _id: "$famsup",
        avgGrade: { $avg: "$G3" },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  const statsSchoolSup = await dataCollection.aggregate([
    {
      $group: {
        _id: "$schoolsup",
        avgGrade: { $avg: "$G3" },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  //   { labels: Array, values: Array }
  const labelsFamSup = [];
  const valuesFamSup = [];
  const labelsSchoolSup = [];
  const valuesSchoolSup = [];

  await statsFamSup.forEach((stat) => {
    labelsFamSup.push(stat._id);
    valuesFamSup.push(stat.avgGrade);
  });
  await statsSchoolSup.forEach((stat) => {
    labelsSchoolSup.push(stat._id);
    valuesSchoolSup.push(stat.avgGrade);
  });

  //   res.send(await stats.toArray());
  res.json({
    labelsFamSup,
    valuesFamSup,
    labelsSchoolSup,
    valuesSchoolSup,
  });
});

app.listen(8000, () => console.log("listening on port 8000"));
