// Jan 1st 1970 00:00:00 am
const moment = require('moment');

// var createdAt = 1234;
// var current = moment();
// var date = moment(1234);
// //console.log(date.format('MMM Do, YYYY'));
//
// console.log(date.format('h:mm a'));

var someTimestamp = moment().valueOf();
console.log(someTimestamp);
var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('h:mm a'));
