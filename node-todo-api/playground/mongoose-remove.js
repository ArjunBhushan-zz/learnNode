const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require ('./../server/models/todo');

// Todo.remove({})
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Todo.findOneAndRemove()
//   .then((todo) => {
//     console.log(todo);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

Todo.findByIdAndRemove('5b251e17bf8dd12808063843')
  .then((todo) => {
    console.log(todo);
  })
  .catch((err) => {
    console.log(err);
  });
