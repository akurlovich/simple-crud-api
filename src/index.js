const http = require('http');
const { PORT } = require('./config.js');
const Person = require("./controller");
const { getReqData } = require("./utils");

const serverPORT = PORT || 5000;

const server = http.createServer(async (req, res) => {
  if (req.url === "/person" && req.method === "GET") {
    const persons = await new Person().getAllPersons();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(persons));
  }

  else if (req.url.match(/\/person\/./) && req.method === "GET") {
    try {
      const id = req.url.split("/")[2];
      const person = await new Person().getPerson(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(person));
    } catch (error) {
      if (error === 'No valid person id') {
        res.writeHead(400, { "Content-Type": "application/json" });
        // send the error
        res.end(JSON.stringify({ message: error }));
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: error }));
      }
    }
  }

  else if (req.url.match(/\/person\/./) && req.method === "DELETE") {
    try {
      const id = req.url.split("/")[2];
      let message = await new Person().deletePerson(id);
      res.writeHead(204, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message }));
    } catch (error) {
      if (error === 'No valid person id') {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: error }));
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: error }));
      }
    }
  }

  else if (req.url.match(/\/person\/./) && req.method === "PUT") {
    try {
      const id = req.url.split("/")[2];
      let personData = await getReqData(req);
      let updatedPerson = await new Person().updatePerson(id, personData);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updatedPerson));
    } catch (error) {
      if (error === 'No valid person id') {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: error }));
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: error }));
      }
    }
  }

  else if (req.url === "/person" && req.method === "POST") {
    try {
      let personData = await getReqData(req);
      let person = await new Person().createPerson(JSON.parse(personData));
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(person));

    } catch (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: error }));
    }
  }

  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(serverPORT, () => {
  console.log(`server started on port: ${serverPORT}`);
});