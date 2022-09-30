const http = require("http");
const express = require("express");
let app = express();
let path = require("path");
let data = require("./data-service.js");

/*--------------------------------Server--------------------------------------*/
let HTTP_PORT = process.env.PORT || 80;

app.use(express.static("public/css"));

function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

/*----------------------------Routes--------------------------------------------*/

app.get("/", (req, res) => {
  req.header("Content-Type", "text/html");
  res.status(200).sendFile(path.join(__dirname, "./views/home.html"));
});

app.get("/about", (req, res) => {
  req.header("Content-Type", "text/html");
  res.status(200).sendFile(path.join(__dirname, "./views/about.html"));
});

app.get("/intlstudents", (req, res) => {
  req.header("Content-Type", "text/html");
  data.getInternationalStudents().then((data) => {
    res.status(200).send(data);
  }).catch((err) => {
    res.status(404).sendFile(path.join(__dirname, "./views/404.html"), { message: err });
  });
});

app.get("/programs", (req, res) => {
  req.header("Content-Type", "text/html");
  data.getPrograms().then((data) => {
    res.status(200).send(data);
  }).catch((err) => {
    res.status(404).sendFile(path.join(__dirname, "./views/404.html"), { message: err });
  });
});

app.get("/students", (req, res) => {
  req.header("Content-Type", "text/html");
  res.status(200).getPrograms().then((data) => {
    res.status(200).send(data);
  }).catch((err) => {
    res.status(404).sendFile(path.join(__dirname, "./views/404.html"), { message: err });
  });
});

app.use((req, res) => {
  req.header("Content-Type", "text/html");
  res.status(404).sendFile(path.join(__dirname, "./views/404.html"));
});
/*--------------------------------------Get Data---------------------------------*/
data.initialize().then(() => {
  app.listen(HTTP_PORT, onHttpStart);
}).catch((err) => {
  console.log(`Error in initializing the data.${err}`);
});