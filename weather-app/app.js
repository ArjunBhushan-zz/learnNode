const yargs = require('yargs');
const request = require('request');
const weather = require( './weather/weather.js');
const geocode = require('./geocode/geocode.js');

const argv = yargs
  .options({
    a: {
      describe: 'Address of location',
      demand: true,
      alias: 'address',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

// googlekey: AIzaSyAQYvRnQE7A2MYD0jql4XTPIrqAOTIONH0
var callback = (errorMessage, results) => {

}

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage){
    console.log(errorMessage);
  }else{
    weather.getWeather(results.Latitude, results.Longitude, (errorMessage, weatherResults)=> {
      if(errorMessage){
        console.log(errorMessage);
      }else{
        console.log(results.Address);
        console.log(`The current temperature is ${weatherResults.temperature}, and it feels like ${weatherResults.apparentTemperature}`);
      }
    });
  }
});


//darksky api: 8e6fa3c819fdb4c77d878847cb4d4355
