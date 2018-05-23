const request = require('request');

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    request({
      url:`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAQYvRnQE7A2MYD0jql4XTPIrqAOTIONH0`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Unable to connect to Google servers');
      }else if(body.status === 'ZERO_RESULTS'){
        reject('Unable to find that address');
      }else if(body.status === 'OK'){
        resolve({
          Address: body.results[0].formatted_address,
          Latitude: body.results[0].geometry.location.lat,
          Longitude: body.results[0].geometry.location.lng
        });
      }
    });
  });
};

geocodeAddress('191461421412').then((location) => {
  console.log(JSON.stringify(location, undefined, 3));
},(errorMessage)=> {
  console.log(errorMessage);
});
