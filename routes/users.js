// const express = require("express");
// const User = require("../models/user");

// const router = express.Router();

// /* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

// router.post("/signup", (req, res, next) => {
//   User.findOne({ username: req.body.username })
//     .then((user) => {
//       if (user) {
//         const err = new Error(`User ${req.body.username} already exists!`);
//         err.status = 403;
//         return next(err);
//       } else {
//         User.create({
//           username: req.body.username,
//           password: req.body.password,
//         })
//           .then((user) => {
//             res.statusCode = 200;
//             res.setHeader("Content-Type", "application/json");
//             res.json({ status: "Registration Successful!", user: user });
//           })
//           .catch((err) => next(err));
//       }
//     })
//     .catch((err) => next(err));
// });

// router.post("/login", (req, res, next) => {
//   if (!res.session.user) {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//       const err = new Error("You are not authenticated!");
//       res.setHeader("WWW-Authenticate", "Basic");
//       err.status = 401;
//       return next(err);
//     }

//     const auth = Buffer.from(authHeader.split(" ")[1], "base64")
//       .toString()
//       .split(":");
//     const username = auth[0];
//     const password = auth[1];
//   } else {
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "text/plain");
//     res.end("You are already authenticated!");
//   }
// });

// module.exports = router;
