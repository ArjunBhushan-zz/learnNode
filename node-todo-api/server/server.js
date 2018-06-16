var express = require('express');
var bodyParser= require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/todo');
var {ObjectId} = require('mongodb');

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

//GET /todos/
app.get('/todos/:id', (req,res) => {
  var id = req.params.id;

  if(!ObjectId.isValid(id)){
    res.status(404).send();
  }else{
    Todo.findById(id)
      .then((todo) => {
        if(!todo){
          res.status(404).send();
        }
        res.status(200).send({todo});
      })
      .catch((err) => {
        res.status(400).send();
      });
  }
});


app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
