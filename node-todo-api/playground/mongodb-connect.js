// const {MongoClient, ObjectID} = require ('mongodb');
const {MongoClient, ObjectID} = require ('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect( 'mongodb://localhost/TodoApp' , (err, client) => {
  if (err){
    console.log('Unable to connect to MondoDB server', err);
  }else{
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    db.collection('Todo').insertOne({
      text: 'Unique boi',
      completed: false
    }, (err, result) => {
      if (err){
        console.log ('Unable to insert todo', err);
      }else{
        console.log(JSON.stringify(result.ops, undefined, 2));
      }
    });

     // db.collection('Users').insertOne({
     //   name: 'Kiki',
     //   age: 19,
     //      location: 'Markham'
     // }, (err, result) => {
     //   if(err){
     //     console.log(err);
     //   }else{
     //     console.log(JSON.stringify(result.ops, undefined, 2));
     //   }
     // });

  }
  client.close();
});
