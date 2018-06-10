var mongoose = require('mongoose');
//sudo mongod --storageEngine=mmapv1 --dbpath mongo-local/
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {
  mongoose
};
