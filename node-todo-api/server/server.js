const express = require('express');
const bodyParser= require('body-parser');
const _ = require('lodash');
const {ObjectId} = require('mongodb');
const bcrypt = require ('bcryptjs');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  var time = new Date().toString();
  console.log(`${req.method} ${req.url} at ${time}`);
  next();
});

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

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectId.isValid(id)){
    res.status(404).send();
    return;
  }
  Todo.findByIdAndRemove(id)
    .then((todo) => {
      if(!todo){
        res.status(404).send();
        return;
      }
      res.status(200).send(todo);
    })
    .catch((err) => {
      res.status(400).send();
    });
});

app.patch('/todos/:id', (req,res) =>{
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);
  if(!ObjectId.isValid(id)){
    res.status(404).send();
    return;
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
    .then((todo) => {
      if(!todo){
        res.status(404).send();
        return;
      }
      res.status(200).send({todo});
    })
    .catch((err) => {
      res.status(400).send();
    });
});

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save()
    .then(() => {
      return user.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send(user);
    })
    .catch((err) => {
      res.status(400).send();
    });
});

app.get('/users/me', authenticate, (req,res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  var login = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(login.email, login.password)
    .then((user) => {
      return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user);
      });
    }).catch((err) => {
      res.status(400).send();
    });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
