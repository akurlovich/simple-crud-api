const http = require('http');
// import * as http from 'http';
const { PORT } = require('./config.js');
const Person = require("./controller");
const { getReqData } = require("./utils");

const serverPORT = PORT || 5000;

const server = http.createServer(async (req, res) => {
  // /api/todos : GET
  if (req.url === "/person" && req.method === "GET") {
    // get the todos.
    const persons = await new Person().getAllPersons();
    // set the status code, and content-type
    res.writeHead(200, { "Content-Type": "application/json" });
    // send the data
    res.end(JSON.stringify(persons));
  }

  // /api/todos/:id : GET
  // else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "GET") {
  else if (req.url.match(/\/person\/./) && req.method === "GET") {
    try {
      // get id from url
      const id = req.url.split("/")[2];
      // get todo
      const person = await new Person().getPerson(id);
      // set the status code and content-type
      res.writeHead(200, { "Content-Type": "application/json" });
      // send the data
      res.end(JSON.stringify(person));
    } catch (error) {
      // set the status code and content-type
      res.writeHead(404, { "Content-Type": "application/json" });
      // send the error
      res.end(JSON.stringify({ message: error }));
    }
  }

  // /api/todos/:id : DELETE
  else if (req.url.match(/\/person\/./) && req.method === "DELETE") {
    try {
      // get the id from url
      const id = req.url.split("/")[2];
      // delete todo
      let message = await new Person().deletePerson(id);
      // set the status code and content-type
      res.writeHead(200, { "Content-Type": "application/json" });
      // send the message
      res.end(JSON.stringify({ message }));
    } catch (error) {
      // set the status code and content-type
      res.writeHead(404, { "Content-Type": "application/json" });
      // send the error
      res.end(JSON.stringify({ message: error }));
    }
  }

  // /api/todos/:id : UPDATE
  else if (req.url.match(/\/person\/./) && req.method === "PUT") {
    try {
      // get the id from the url
      const id = req.url.split("/")[2];
      // update todo
      let personData = await getReqData(req);
      let updatedPerson = await new Person().updatePerson(id, personData);
      // set the status code and content-type
      res.writeHead(200, { "Content-Type": "application/json" });
      // send the message
      res.end(JSON.stringify(updatedPerson));
    } catch (error) {
      // set the status code and content type
      res.writeHead(404, { "Content-Type": "application/json" });
      // send the error
      res.end(JSON.stringify({ message: error }));
    }
  }

  // /api/todos/ : POST
  else if (req.url === "/person" && req.method === "POST") {
    try {
      // get the data sent along
      let personData = await getReqData(req);
      // create the todo
      let person = await new Person().createPerson(JSON.parse(personData));
      // set the status code and content-type
      res.writeHead(200, { "Content-Type": "application/json" });
      //send the todo
      res.end(JSON.stringify(person));

    } catch (error) {
      // set the status code and content type
      res.writeHead(404, { "Content-Type": "application/json" });
      // send the error
      res.end(JSON.stringify({ message: error }));
    }
  }

  // No route present
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(serverPORT, () => {
  console.log(`server started on port: ${serverPORT}`);
});