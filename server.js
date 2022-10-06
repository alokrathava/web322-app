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

const express = require("express");
let app = express();
let path = require("path");
let data = require("./data-service.js");

let HTTP_PORT = process.env.PORT || 80;

var statusCode = {
  OK: 200, NotFound: 404
};
/*--------------------------------Server--------------------------------------*/

app.use(express.static("public/css"));

function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

/*----------------------------Routes--------------------------------------------*/
app.get("/", (req, res) => {
  req.header("Content-Type", "text/html");
  res.status(statusCode.OK).sendFile(path.join(__dirname, "./views/home.html"), (err) => {
    if (err) {
      console.log(err);
    }
  });
});

app.get("/about", (req, res) => {
  req.header("Content-Type", "text/html");
  res.status(statusCode.OK).sendFile(path.join(__dirname, "./views/about.html"), (err) => {
    if (err) {
      console.log(err);
    }
  });
});

app.get("/intlstudents", (req, res) => {
  req.header("Content-Type", "text/html");
  data.getInternationalStudents().then((data) => {
    res.status(statusCode.OK).send(data);
  }).catch((err) => {
    res.status(statusCode.NotFound).sendFile(path.join(__dirname, "./views/404.html"), (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
});

app.get("/programs", (req, res) => {
  req.header("Content-Type", "text/html");
  data.getPrograms().then((data) => {
    res.status(statusCode.OK).send(data);
  }).catch((err) => {
    res.status(statusCode.NotFound).sendFile(path.join(__dirname, "./views/404.html"), { message: err });
  });
});

app.get("/students", (req, res) => {
  req.header("Content-Type", "text/html");
  data.getAllStudents().then((data) => {
    res.status(statusCode.OK).send(data);
  }).catch((err) => {
    res.status(statusCode.NotFound).sendFile(path.join(__dirname, "./views/404.html"), { message: err });
  });
});

app.use((req, res) => {
  req.header("Content-Type", "text/html");
  res.status(statusCode.NotFound).sendFile(path.join(__dirname, "./views/404.html"), (err) => {
    if (err) {
      res.status(statusCode.NotFound).send(`Page Not Found ${statusCode.NotFound}`);
    }
  });
});
/*--------------------------------------Get Data---------------------------------*/
data.initialize().then(() => {
  app.listen(HTTP_PORT, onHttpStart);
}).catch((err) => {
  console.log(`Error in initializing the data.${err}`);
});