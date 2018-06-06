const {MongoClient, ObjectID} = require ('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect( 'mongodb://localhost/TodoApp' , (err, client) => {
  if (err){
    console.log('Unable to connect to MondoDB server', err);
  }else{
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');
    // db.collection('Todo').find({
    //   _id:new ObjectID('5b1834fe7a499b0101a1b075')
    // }).toArray()
    //   .then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    //   })
    //   .catch ((err) => {
    //     console.log('Unable to fetch todos', err);
    //   });
    db.collection('Todo').find().count()
      .then((count) => {
        console.log(`Todos count: ${count}`);
      })
      .catch ((err) => {
        console.log('Unable to fetch todos', err);
      });

    // db.collection('Todo').insertOne({
    //   text:'Something to do',
    //   completed: false
    // }, (err, result) => {
    //   if (err){
    //     console.log ('Unable to insert todo', err);
    //   }else{
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    //   }
    // });

    // db.collection('Users').insertOne({
    //   name: 'Arjun',
    //   age: 19,
    //   location: 'Markham'
    // }, (err, result) => {
    //   if(err){
    //     console.log(err);
    //   }else{
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    //   }
    // });

    db.collection('Users').find({
      name: "Arjun"
    }).toArray()
      .then((users) => {
        console.log(JSON.stringify(users, undefined, 2));
      })
      .catch((err) => {
        console.log('There was an error grabbing the users ', err);
      })

  }
  client.close();
});
