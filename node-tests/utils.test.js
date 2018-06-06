const utils = require('./utils/utils.js');
const expect = require('expect');

it('should add two numbers', () => {
  var res = utils.add(33 ,11);
  expect(res).toBe(44).toBeA('number');
});

it('should square the numbers', () => {
  var res = utils.square(5);
  expect(res).toBe(25).toBeA('number');
});

// it('should expect some values', () => {
//   // expect(12).toNotBe(11);
//   // expect({name: "Arjun"}).toNotEqual({name: "arjun"});
//   //expect([2,3,4]).toExclude(5);
//   // expect({
//   //   name: "arjun",
//   //   age: 18
//   // }).toInclude({
//   //   age: 18
//   // });
// });

it('should verify first and last names are set' , () => {
  var user = {
    age: 15,
    fullName: 'Arjun Bhushan'
  };
  user = utils.setName(user, user.fullName);
  expect(user).toInclude({
    firstName: 'Arjun',
    lastName: 'Bhushan'
  }).toBeA('object');
});
