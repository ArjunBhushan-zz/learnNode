const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect( 'mongodb://localhost/TodoApp' , (err, client) => {
  if (err){
    console.log('Unable to connect to MondoDB server', err);
  }else{
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    //deleteMany
    var arrayOfDuplicates = [];
    db.collection('Todo').find().toArray()
      .then((res) => {
        for (var i=0; i<res.length ; i++){
          if (arrayOfDuplicates[res[i].text]){
            arrayOfDuplicates[res[i].text].number++;
          }else{
              arrayOfDuplicates[res[i].text]= {
                task: res[i].text,
                number: 1
              };
          }
        }
      })
    // db.collection('Todo').deleteMany({text: 'Eat lunch'})
    //   .then((res) => {
    //     console.log(res.result.n);
    //   })
    //   .catch((err) => {
    //     console.log('There was an error deleting those tasks ', err)
    //   });
    //deleteOne
    // db.collection('Todo').deleteOne({text: 'Eat lunch'})
    //   .then((res) => {
    //     console.log(res.result.n);
    //   })
    //   .catch((err) => {
    //     console.log('There was an error deleting that task ', err);
    //   });
    // findOneAndDelete
    // db.collection('Todo').findOneAndDelete({
    //   _id: new ObjectID('5b184a8acbdf0204ca166f46')
    // })
    //   .then((res) => {
    //     console.log(JSON.stringify(res, undefined, 2));
    //   })
    //   .catch((err) => {
    //     console.log('There was an error deleting that task ', err);
    //   });
  }
  client.close();
});
