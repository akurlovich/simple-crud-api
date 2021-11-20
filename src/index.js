const http = require('http');
const { PORT } = require('./config.js');

http.createServer(function(req, res){
  res.end('Hello')
}).listen(PORT, () => {
  console.log(`Server start on port ${PORT}`)
})