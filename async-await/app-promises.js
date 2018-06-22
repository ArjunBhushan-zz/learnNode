const users = [{
  id: 1,
  name: 'Arjun',
  schoolId: 101
},{
  id: 2,
  name: 'Apoorv',
  schoolId: 121
}];

const grades = [{
  id: 1,
  schoolId: 101,
  grade: 95
},{
  id: 2,
  schoolId: 131,
  grade: 94
},{
  id: 3,
  schoolId: 101,
  grade: 90
}];

const getUser = (id) => {
  return new Promise ((resolve, reject) => {
    const user = users.find((user) => {
      return user.id === id;
    });
    if (user){
      resolve(user);
    }else{
      reject(`Unable to find user of id, ${id}`);
    }
  });
};

const getGrades = (schoolId) => {
  return new Promise((resolve,reject) => {
    resolve(grades.filter((grade) => {
      return grade.schoolId === schoolId;
    }));
  });
};

//Andrew has a 83 average in the class;
const getStatus = (id) => {
  return new Promise((resolve,reject) => {
    var average=0;
    getUser(id)
      .then((foundUser) => {
        getGrades(foundUser.schoolId).then((foundGrades) =>{
          if(foundGrades.length > 0){
            foundGrades.forEach((grade) => {
              average+=grade.grade;
            });
            average /= foundGrades.length;
            average = average.toString();
            resolve(`${foundUser.name} has a ${average} in the class`);
          }else{
            throw Error('No grades found');
          }
        }).catch((err) =>{
          reject(err);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

//async await

const getStatusAlt = async (userId) => {
  const user = await getUser(userId);
  const grades = await getGrades(user.schoolId);
  if(grades.length === 0){
    throw Error(`${user.name} does not attend any school`);
  }
  let average = grades.map((grade) => grade.grade).reduce((a,b) => a + b)/ grades.length;
  return `${user.name} has a ${average}% average in the class`;
};

getStatusAlt(2).then((status) => {
    console.log(status);
  }).catch((err) => {
    console.log(err);
  });
// getStatus(2)
//   .then((status) => {
//     console.log(status);
//   }).catch((err) =>{
//     console.log(err);
//   });
