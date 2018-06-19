require('./../config/config');
var mongoose = require('mongoose');
console.log(process.env.DB_Host);
//sudo mongod --storageEngine=mmapv1 --dbpath mongo-local/
mongoose.Promise = global.Promise;
if (process.env.PORT){
  mongoose.connect(process.env.DB_Host);
}else{
  mongoose.connect(process.env.DB_Host);
}
module.exports = {
  mongoose
};
