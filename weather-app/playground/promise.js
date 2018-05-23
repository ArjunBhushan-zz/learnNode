var somePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    //resolve('Hey. it worked!');
    reject('Unable to fulfill promise');
  }, 2500);
});

somePromise
  .then((message) => {
    console.log('Success: ', message);
  })
  .catch((errorMessage) => {
  console.log('Erorr: ',  errorMessage);
});
