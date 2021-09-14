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

// new app use

// app.use("/internet", internetChartRouter);

// query data

// get route
// app.get("/", (req, res) => {
//   db.getSiblingDB("src");
//   db.getCollection("data").find({});
//   db.collection.count();

//   res.status(200);
//   res.json(data);

//   const client = await MongoClient.connect("mongodb://localhost:27017", {
//     useNewUrlParser: true,
//   });
//   const db = clientdb("");
// });

const MONGO_URL = "mongodb://76.107.181.181/32";
const MONGO_PASS = "RodolfoJ08-";
const MONGO_URI = `mongodb+srv://mydbuser:${MONGO_PASS}@cluster0.ab4he.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
(async () => {
  const mongoClient = await MongoClient.connect(MONGO_URI, {
    useNewUrlParser: true,
  });
  const db = await mongoClient.db("src");
  const dataCollection = await db.collection("data");

  //   guia para conseguir un doc

  //   const foo = await dataCollection.findOne({
  //     G3: 10,
  //   });

  const fooz = await dataCollection.aggregate([
    {
      $group: {
        _id: "$internet",
        avgGrade: { $avg: "$G3" },
      },
    },
  ]);

  //   console.log("resultado: ", fooz);
  //   fooz.forEach(console.log);

  //   throw Error();

  const internetYes = await dataCollection.find();
  //   console.log(await dataCollection.count);
  //   console.log(await internetYes.count());
  //   var totalInternet = 0;
  //   await internetYes.forEach((student) => {
  //     if (student.internet == "yes") {
  //       totalInternet++;
  //     }
  //   });
  //   console.log(`${totalInternet} students have internet`);
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
  ]);

  // que necesita el frontend?
  // 1. data: Array[Number]
  // 2. labels: Array[String]

  //   { labels: Array, values: Array }
  const labels = [];
  const values = [];

  //[_id, 'no', avgGrade: '9']
  //[_id, 'yes', avgGrade: '10']
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
  ]);

  // que necesita el frontend?
  // 1. data: Array[Number]
  // 2. labels: Array[String]

  //   { labels: Array, values: Array }
  const labels = [];
  const values = [];

  //[_id, 'no', avgGrade: '9']
  //[_id, 'yes', avgGrade: '10']
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

  // que necesita el frontend?
  // 1. data: Array[Number]
  // 2. labels: Array[String]

  //   { labels: Array, values: Array }
  const labels = [];
  const values = [];
  const labels2 = [];
  const values2 = [];
  const labels3 = [];
  const values3 = [];

  //[_id, 'no', avgGrade: '9']
  //[_id, 'yes', avgGrade: '10']
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

app.listen(8000, () => console.log("listening on port 8000"));
