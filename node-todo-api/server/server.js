var express = require('express');
var bodyParser= require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/todo');

var app = express();
var port = 3000;

app.use(bodyParser.json());

app.post('/todos', (req,res) => {
  var todo = new Todo ({
    text: req.body.text
  });

  todo.save()
    .then((doc) => {
      res.status(200).send(doc);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get('/todos', (req,res) => {
  Todo.find()
    .then((todos) => {
      res.status(200).send({todos});
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
