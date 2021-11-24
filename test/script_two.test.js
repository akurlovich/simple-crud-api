// const { request: unauthorizedRequest, routes } = require('./lib');
const { request } = require('./lib');
const { v4 } = require('uuid');

const TEST_PERSON_DATA = {
  id: v4(),
  name: "Jon",
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
  test('should get all persons', async () => {
    await request
      .get('/person')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.length).toBe(2);
      });
  });

});

describe('POST', () => {
  test('should create task with status code 201', async () => {
    await request
      .post('/person')
      .set('Accept', 'application/json')
      .send(TEST_PERSON_DATA)
      .expect(201)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.statusCode).toBe(201);
      });
  });

  test('should get a person by wrong id', async () => {
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
  test('should update task successfully', async () => {

    await request
      .put(`/person/${person.id}`)
      .set('Accept', 'application/json')
      .send(TEST_UPDATE_PERSON_DATA)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.name).toBe('Anna');
      });

  });
});

describe('DELETE', () => {
  test('not valid id for delete person', async () => {
    await request
      .delete(`/person/${person.id}123`)
      .then(res => {
        expect(res.status).toBe(400);
      })
  });
});


