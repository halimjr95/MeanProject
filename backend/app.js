const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const Post = require('./models/post');

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

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
   );

  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, DELETE, PUT, PATCH, OPTIONS");

  next();
})

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    });
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find().then(results => {
    res.status(200).json({
      message: "fetced success",
      posts: results
    })
  })
})

app.get('/api/posts/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
})

app.put('/api/posts/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  console.log(post)
  Post.updateOne({ _id: req.params.id }, post).then(result => {
    res.status(200).json({ message: "Update successful!" });
  });
});

// app.put('/api/posts/:postId', (req, res, next) => {
//   const post = new Post ({
//     _id: req.body.id,
//     title: req.body.title,
//     content: req.body.title
//   })

//   Post.updateOne({_id: req.params.postId}, post).then(result => {
//     res.json({
//       message: 'post updated successfully'
//     })
//   })
// })

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({ message: "deleted success"})
  });
});


module.exports = app;
