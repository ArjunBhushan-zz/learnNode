
//addUser(id, name, room)
//removeUser(id)
//getUser(id)
//getUserList(room)

// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age= age;
//   }
//   getUserDescription(){
//     return `${this.name} is ${this.age} year(s) old`;
//   }
// }
// [{
//   name: 'deparamed name',
//   id: 'sockets id',
//   room: 'deparamed user'
// }]
class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser(id){
    var user = this.getUser(id);
    if(user){
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }
  getUser (id) {
    return this.users.filter((user) => {
      return user.id === id;
    })[0];
  }
  getUserList (room) {
    var users = this.users.filter((user) => {
      return user.room === room;
    });
    var namesArray = users.map((user) => {
      return user.name;
    });
    return namesArray;
  }
  getUsersByName(name){
    return this.users.filter((user) => {
      return user.name === name;
    });
  }
}

module.exports = {
  Users
};
