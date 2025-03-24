const fs = require("fs");
const express = require("express");
const app = express();
const port = 3000;
const http = require("http");

app.use(express.json());

function writelog(req, res) {
  var path = req.route.path;
  var method = req.method;
  var date = new Date();

  var str = "Path: " + path + ", Method: " + method + ", Date: " + date + "\n";
  fs.appendFileSync("log.txt", str);
}

// app.get('/', (req,res) => {

//   writelog(req,res);
//   var body = "Hello World";
//   res.writeHead(200, {
//     "content-length": Buffer.byteLength(body),
//     "content-type" : "text/plain"
//   })
//   res.end(body);

// })

// app.get('/', (req,res) => {

//   writelog(req,res);
//   var body = "<html><h1>Hello</h1></html>";
//   res.writeHead(200, {
//     "content-length": Buffer.byteLength(body),
//     "content-type" : "text/html"
//   })
//   res.end(body);

// })

app.get("/", (req, res) => {
  writelog(req, res);
  var body = fs.readFileSync("./index.html", "utf-8");
  var str = body.replace("My First Heading", "Hello World " + new Date());
  res.writeHead(200, {
    "content-length": Buffer.byteLength(str),
    "content-type": "text/html",
  });
  res.end(str);
});

app.get("/user/:name", (req, res) => {
  writelog(req, res);
  var nome = req.params.name;
  var body = "Hello " + nome;

  res.writeHead(200, {
    "content-length": Buffer.byteLength(body),
    "content-type": "text/plain",
  });
  res.end(body);
});

app.get("/list", (req, res) => {
  writelog(req, res);
  var body = fs.readFileSync("./log.txt", "utf-8");
  res.writeHead(200, {
    "content-length": Buffer.byteLength(body),
    "content-type": "text/plain",
  });
  res.end(body);
});

app.get("/down", (req, res) => {
  writelog(req, res);
  res.download("./index.html");
});

app.get("/clear", (req, res) => {
  fs.writeFileSync("log.txt", "");
  writelog(req, res);
  res.send("Ficheiro Apagado");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
