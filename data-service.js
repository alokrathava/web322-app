/*********************************************************************************
 *  WEB322 – Assignment 1
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.
 *  No part of this assignment has been copied manually or electronically from any other source
 *  (including websites) or distributed to other students.
 *
 *  Name: Alokkumar Rathava Student ID: 145877205 Date: 30/09/2022
 *
 *  Online (Cyclic) URL: https://dull-cyan-basket-clam-wear.cyclic.app/
 *
 ********************************************************************************/
var students = [];
var programs = [];
var fs = require("fs");

/*---------------------------------Initialize Function----------------------------------------------*/
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

/*--------------------------------Get All Students------------------------------------------------*/
module.exports.getAllStudents = () => {
  return new Promise((resolve, reject) => {
    if (students.length > 0) {
      resolve(students);
    } else {
      reject("No Results Returned");
    }
  });
};

/*----------------------------------------Get All Students----------------------------------------*/
module.exports.getInternationalStudents = () => {
  return new Promise((resolve, reject) => {
    const intStudents = students.filter((stu) => {
      return stu.isInternationalStudent === true;
    });
    if (intStudents.length > 0) {
      resolve(intStudents);
    } else {
      reject("No Results Returned");
    }
  });
};

/*-----------------------------------------Get All Program----------------------------------------*/
module.exports.getPrograms = () => {
  return new Promise((resolve, reject) => {
    if (programs.length > 0) {
      resolve(programs);
    } else {
      reject("No Results Returned");
    }
  });
};