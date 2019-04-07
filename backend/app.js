const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');


const routePosts = require('./routes/posts');
const routeUser = require('./routes/user');


mongoose
  .connect(
    "mongodb+srv://ahmed:CqgTJ97EL0bu37hG@cluster0-jjnxz.mongodb.net/mean?retryWrites=true"
  )
  .then(() => {
    console.log("Connected to database!");
  }).catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json())
app.use("/images", express.static(path.join("backend/images")))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
   );

  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, DELETE, PUT, PATCH, OPTIONS");

  next();
})


app.use('/api/posts', routePosts);
app.use('/api/user', routeUser);

module.exports = app;
