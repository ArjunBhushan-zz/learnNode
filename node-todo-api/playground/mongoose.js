const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require ('./../server/models/todo');
const {ObjectID} = require ('mongoose');
const {User} = require('./../server/models/user');
var id = '5b1d809e6dd8b702ed05c28c';
// var id = '5b1d7bb7c2697b028ee015667';
//
// if (!ObjectID.isValid(id)){
//   console.log('ID not valid');
//   return;
// }
// Todo.find({
//   _id: id
//   })
//   .then((todos) => {
//     console.log(todos);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
//
// Todo.findOne({
//   _id: id
//   })
//   .then((todo) => {
//     console.log(todo);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
//
// Todo.findById(id)
//   .then((todo) => {
//     if (!todo){
//       throw new Error(('Id not found'));
//     }
//     console.log(todo);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
User.findById(id)
  .then((user) => {
    if(!user){
      throw new Error ('User ID not found');
    }
    console.log(user);
  })
  .catch((err) => {
    console.log(err);
  });
