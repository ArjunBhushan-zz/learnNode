const yargs = require('yargs');
const axios = require('axios')
const argv = yargs
  .options({
    a: {
      describe: 'Address of location',
      demand: false,
      alias: 'address',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var defaultAddress = encodeURIComponent('Markham, ON');
var encodedAddress = encodeURIComponent(argv.address);
var geoCodeAddress;
if (argv.address){
  geoCodeAddress = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAQYvRnQE7A2MYD0jql4XTPIrqAOTIONH0`;
}else{
  geoCodeAddress = `https://maps.googleapis.com/maps/api/geocode/json?address=${defaultAddress}&key=AIzaSyAQYvRnQE7A2MYD0jql4XTPIrqAOTIONH0`;
}

axios.get(geoCodeAddress)
   .then((response) => {
     if(response.data.status === 'ZERO_RESULTS'){
       throw new Error('Unable to find that address.');
     }
     var lat= response.data.results[0].geometry.location.lat;
     var lng= response.data.results[0].geometry.location.lng;
     var weatherURL = `https://api.darksky.net/forecast/8e6fa3c819fdb4c77d878847cb4d4355/${lat},${lng}`;
     console.log(response.data.results[0].formatted_address);
     return axios.get(weatherURL);
     //console.log('Latitude: ', JSON.stringify(response.data.results[0].geometry.location.lat, undefined, 3));
     //console.log('Longitude: ', JSON.stringify(response.data.results[0].geometry.location.lng, undefined, 3));
   })
   .then((response)=> {
     var temperature = (response.data.currently.temperature - 32)/1.8;
     var apparentTemperature = (response.data.currently.apparentTemperature -32)/1.8;
     console.log('Curent Temperature: ', temperature);
     console.log('Apparent Temperature: ', apparentTemperature);
   })
   .catch((e) => {
     if(e.code === 'EAI_AGAIN'){
       console.log('Unable to connect to the server.');
     }else if(e.code === 'ENOTFOUND'){
       console.log('Unable to fetch weather server');
     }else{
       console.log(e.message);
     }
   });
