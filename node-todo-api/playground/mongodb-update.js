const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect( 'mongodb://localhost/TodoApp' , (err, client) => {
  if (err){
    console.log('Unable to connect to MondoDB server', err);
  }else{
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    db.collection('Users').findOneAndUpdate({
      _id: new ObjectID("5b18907c1d05e100ea2b1937")
    }, {
      $set: {
        name: "Heaven"
      },
      $inc: {
        age: 100
      }
    }, {
      returnOriginal:false
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log('There was an error updating, ', err);
      });
  }
  //client.close();
});
