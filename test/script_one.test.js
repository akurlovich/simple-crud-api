// const { request: unauthorizedRequest, routes } = require('./lib');
const { request } = require('./lib');

const TEST_PERSON_DATA = {
  id: '7cf9de3e-b621-4842-b41b-433ade67dc14',
  name: "Jon",
  age: "30",
  hobbies: ['tennis'],
};

let person;

const TEST_UPDATE_PERSON_DATA = {
  id: '6cf9de3e-b621-4842-b41b-433ade67dc22',
  name: "Anna",
  age: "11",
  hobbies: ['swimming'],
};

describe('GET', () => {
  test('should get all persons', async () => {
    await request
      .get('/person')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });

});

describe('POST', () => {
  test('should create person successfully', async () => {
    await request
      .post('/person')
      .set('Accept', 'application/json')
      .send(TEST_PERSON_DATA)
      .expect(201)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.id).toBe('7cf9de3e-b621-4842-b41b-433ade67dc14');
      });
  });

  test('should get a person by id', async () => {
    await request
      .post('/person')
      .set('Accept', 'application/json')
      .send(TEST_PERSON_DATA)
      .expect(201)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.id).toBe('7cf9de3e-b621-4842-b41b-433ade67dc14');
        person = res.body;
      });
    await request
      .get(`/person/${person.id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.name).toBe(person.name);
      });
  });
});

describe('PUT', () => {
  test('should update person successfully', async () => {
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
  test('should delete person successfully', async () => {
    await request
      .delete(`/person/${person.id}`)
      .then(res => expect(res.status).toBe(204));

    await request
      .get(`/person/${person.id}`)
      .expect(404);
  });
});
