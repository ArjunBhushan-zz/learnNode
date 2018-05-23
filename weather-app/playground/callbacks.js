const request = require('request');

var getUser = (id, callback) => {
  var user = {
    id,
    name: 'Arjun'
  };
  setTimeout(()=>{
    callback(user);
  }, 3000);
};

getUser(15, (user) => {
  console.log(user);
});
