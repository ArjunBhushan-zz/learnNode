const request = require('request');

var getWeather = (lat, long, callback) => {
  request({
    url: `https://api.darksky.net/forecast/8e6fa3c819fdb4c77d878847cb4d4355/${lat},${long}`,
    json: true
  }, (error, request, body) => {
    if(!error && request.statusCode === 200){
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }else{
      callback('Unable to fetch weather.', undefined);
    }
  });
};

module.exports = {
  getWeather
};
