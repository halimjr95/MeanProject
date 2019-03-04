const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
   );

  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, DELETE, PATCH, OPTIONS");

  next();
})

app.post('/api/posts', (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
})

app.use('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: "sssssss0",
      title: "first message",
      content: 'jvjfvfvbfv'
    },
    {
      id: "sssssddfss0",
      title: "second message",
      content: 'jvjfvdfdfdffvbfv'
    }
  ]

  res.status(200).json({
    message: "fetced success",
    posts: posts
  })
})

module.exports = app;
