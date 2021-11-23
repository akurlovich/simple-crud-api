const Person = require("../src/controller.js");
const http = require('http');
const request = require('supertest');
// const { getReqData } = require("./utils");

describe('Test e2e', () => {
  const a = 10;
  test('valid confug', () => {
    expect(a).toBe(10);
  });
});

describe('GET /user', function() {
  it('responds with json', function(done) {
    request(http)
      .get('http://localhost:4000/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

// test('Get all persons', () => {
//   let data = "";
//   http.get('http://localhost:4000/').on("data", (chunk) => {
//     // append the string version to the body
//     data += chunk.toString();
// }).end()
//   expect(data).toBe([]);
//   // test('get all', async () => {
//   //   const allPerson = await fetch('http//localhost:4000');
//   // })
// })
