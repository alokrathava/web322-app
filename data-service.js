var students = [];
var programs = [];
var fs = require("fs");

/*---------------------------------Export Function----------------------------------------------*/
module.exports.initialize = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("./data/student.json", (err, data) => {
      if (err) reject("Unable to read the file");
      students = JSON.parse(data);
      resolve();
    });
    fs.readFile("./data/program.json", (err, data) => {
      if (err) reject("Unable to read the file");
      programs = JSON.parse(data);
    });
    resolve();
  });
};

module.exports.getAllStudents = () => {
  return new Promise((resolve, reject) => {
    if (students.length > 0) {
      resolve(students);
      /*console.log(students);*/
    } else {
      reject("No Results Returned");
    }
  });
};

module.exports.getInternationalStudents = () => {
  return new Promise((resolve, reject) => {
    const intStudents = students.filter((stu) => {
      return stu.isInternationalStudent === true;
    });
    if (intStudents.length > 0) resolve(intStudents); else reject("No Results Returned");
  });
};

module.exports.getPrograms = () => {
  return new Promise((resolve, reject) => {
    if (programs.length > 0) resolve(programs); else reject("No Results Returned");
  });
};