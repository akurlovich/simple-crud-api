const http = require('http');
const { PORT } = require('./config.js');
const { v4 } = require('uuid');

http.createServer(function (req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8;");
  if (req.url === "/") {
    res.write("<h2>Home</h2>");
  }
  else if (req.url == "/person") {
    res.write("<h2>Person</h2>");
  }
  else if (req.url == "/person/:id") {
    res.write("<h2>Person ID</h2>");
  }
  else {
    res.statusCode = 404;
    res.write("<h2>Page not found</h2>");
  }
  // res.write("<h1>Hello!!!</h1>");
  res.end();
}).listen(PORT, () => {
  console.log(`Server start on port ${PORT}`)
})