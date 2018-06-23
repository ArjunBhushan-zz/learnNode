// USD, CAD, 20
// 20 USD is worth 26 CAD. You can spend these in the following countries: Canada, ...,...,..
//to/from
require('./config/config');
const axios = require('axios');
let url = `http://data.fixer.io/api/latest?access_key=${process.env.data_fixer_key}`;

let convert = async (from, to) => {
  try {
    let response = await axios.get(url);
    let rate = response.data.rates[to]/response.data.rates[from];
    if(isNaN(rate)){
      throw new Error();
    }
    return rate;
  }catch(e){
    throw new Error(`Unable to get exchange rate for ${from} and ${to}`);
  }
}

let countries = async (to) => {
  try {
    let response = await axios.get(`https://restcountries.eu/rest/v2/currency/${to}`);
    let countries = [];
    response.data.forEach((country) => {
      countries.push(country.name);
    });
    return countries.join(', ');
  }catch(err){
    throw new Error (`Unable to get countries that use ${to}`);
  }
}

let info = async (from,to,amount) => {
  let conversion = (await convert(from,to) * amount).toFixed(2).toString();
  let validCountries = await countries(to);
  return `${amount} ${from} is worth ${conversion} ${to}. You can spend these in the following countries: ${validCountries}`;
};

info('CAD', 'USD', 1000).then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err.message);
});
