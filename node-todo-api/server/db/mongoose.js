var mongoose = require('mongoose');
//sudo mongod --storageEngine=mmapv1 --dbpath mongo-local/
mongoose.Promise = global.Promise;
if (process.env.PORT){
  mongoose.connect('mongodb://admin:password1@ds261440.mlab.com:61440/node-notes-db');
}else{
  mongoose.connect('mongodb://localhost:27017/TodoApp');
}
module.exports = {
  mongoose
};
