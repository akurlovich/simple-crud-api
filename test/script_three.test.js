// const { request: unauthorizedRequest, routes } = require('./lib');
const { request } = require('./lib');
const { v4 } = require('uuid');

const TEST_PERSON_DATA = {
  id: v4(),
  name: "Jon",
  age: "30",
  hobbies: ['tennis'],
};

const TEST_NO_REQUIRED_PERSON_DATA = {
  first: "Jon",
  age: "30",
  hobbies: ['tennis'],
};

let person;

const TEST_UPDATE_PERSON_DATA = {
  name: "Anna",
  age: "11",
  hobbies: ['swimming'],
};

beforeAll(async () => {

  await request
    .post('/person')
    .set('Accept', 'application/json')
    .send(TEST_PERSON_DATA)
    .then(res => {
      person = res.body;
    }
    )
});

afterAll(async () => {
  await request
    .delete(`/person/${person.id}`)
    .then(res => {
      person = [];
    });
});

describe('GET', () => {
  test("shouldn't get all persons by wront rout", async () => {
    await request
      .get('/person11')
      .set('Accept', 'application/json')
      .expect(404)
      .expect('Content-Type', /json/)

  });

});

describe('POST', () => {
  test("shouldn't create task with no required field", async () => {
    await request
      .post('/person')
      .set('Accept', 'application/json')
      .send(TEST_NO_REQUIRED_PERSON_DATA)
      .expect(400)
      .expect('Content-Type', /json/)

  });

  test('should get a person by not valid id', async () => {
    await request
      .get(`/person/${person.id}123`)
      .set('Accept', 'application/json')
      .expect(400)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.statusCode).toBe(400);
      });
  });
});

describe('PUT', () => {
  test("shouldn't update person with wrong id", async () => {
    await request
      .put(`/person/${person.id}+1`)
      .set('Accept', 'application/json')
      .send(TEST_UPDATE_PERSON_DATA)
      .expect(400)
      .expect('Content-Type', /json/)
  });
});

describe('DELETE', () => {
  test('person not found', async () => {
    await request
      .delete(`/person/7cf9de3e-b621-4842-b41b-433ade67dc22`)
      .then(res => {
        expect(res.status).toBe(404);
      })
  });
});
