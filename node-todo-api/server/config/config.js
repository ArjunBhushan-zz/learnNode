var scope = "development";

if (process.env.PORT) {
  scope = "production";
}
var config = require('./config.json');
Object.keys(config[scope]).forEach((key) => {
  process.env[key] = config[scope][key];
});
