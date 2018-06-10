const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect( 'mongodb://localhost/TodoApp' , (err, client) => {
  if (err){
    console.log('Unable to connect to MondoDB server', err);
  }else{
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    //deleteMany
    var objectOfDuplicates = {};
    db.collection('Todo').find().toArray()
      .then((res) => {
        for (var i=0; i<res.length ; i++){
          var l = res[i].text;
          if (objectOfDuplicates.hasOwnProperty(l)){
            objectOfDuplicates[l] ++;
          }else{
              objectOfDuplicates[l] = 1
          }
          if(i === res.length -1) {
            Object.keys(objectOfDuplicates).forEach(function(key,index) {
              if(objectOfDuplicates[key] > 1) {
                db.collection('Todo').deleteMany({text: key})
                  .then((res) => {
                    console.log(res.result.n);
                  })
                  .catch((err) => {
                    console.log('There was an error, ', err);
                  });
              }
            });
          }
        }
      })
      .catch((err) => {
        console.log('There was an error grabbing all of the duplicates, ' ,err);
      });
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
    db.collection('Todo').findOneAndDelete({
      _id: new ObjectID('5b18907371943500d49bdf23')
    })
      .then((res) => {
        console.log(JSON.stringify(res, undefined, 2));
      })
      .catch((err) => {
        console.log('There was an error deleting that task ', err);
      });
  }
  //client.close();
});
