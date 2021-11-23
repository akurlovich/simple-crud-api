const supertest = require('supertest');

const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

const routes = require('./routes');

const host =
  process.env.HOST || process.env.PORT
    ? `localhost:${process.env.PORT}`
    : 'localhost:4040';

const request = supertest(host);

console.log(host)

module.exports = {
  request,
  routes
};
