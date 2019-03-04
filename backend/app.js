const express = require('express');
const app = express();

app.use('api/posts', (reo, res, err) => {
  res.send("hi");
})

module.exports = app;
