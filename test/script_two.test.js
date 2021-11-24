// const { request: unauthorizedRequest, routes } = require('./lib');
const { request, routes } = require('./lib');
const { v4 } = require('uuid');

const TEST_PERSON_DATA = {
  id: v4(),
  name: "Jon",
  age: "30",
  hobbies: ['tennis'],
};

let person;

const TEST_UPDATE_PERSON_DATA = {
  // id: '6cf9de3e-b621-4842-b41b-433ade67dc25',
  name: "Anna",
  age: "11",
  hobbies: ['swimming'],
};

// describe('Tasks suite', () => {
//   let request = unauthorizedRequest;
//   let testTaskId;
//   let testBoardId;

  // beforeAll(async () => {
  //   if (shouldAuthorizationBeTested) {
  //     request = await createAuthorizedRequest(unauthorizedRequest);
  //   }

  //   await request
  //     .post(routes.boards.create)
  //     .set('Accept', 'application/json')
  //     .send(TEST_BOARD_DATA)
  //     .then(res => (testBoardId = res.body.id));

  //   await request
  //     .post(routes.tasks.create(testBoardId))
  //     .set('Accept', 'application/json')
  //     .send(TEST_TASK_DATA)
  //     .then(res => (testTaskId = res.body.id));
  // });

  // afterAll(async () => {
  //   await request
  //     .delete(routes.boards.delete(testBoardId))
  //     .then(res => expect(res.status).oneOf([200, 204]));
  // });

describe('Test scritp TWO', () => {
  beforeAll(async () => {
    
    await request
      .post('/person')
      .set('Accept', 'application/json')
      .send(TEST_PERSON_DATA)
      .then(res => {
        person = res.body;
        // console.log('before', person);
      }
      )});


  //   await request
  //     .post(routes.tasks.create(testBoardId))
  //     .set('Accept', 'application/json')
  //     .send(TEST_TASK_DATA)
  //     .then(res => (testTaskId = res.body.id));
  // });

  afterAll(async () => {
    await request
      .delete(`/person/${person.id}`)
      .then(res => {
        person = [];
        // console.log('after', person)
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
          // console.log('get', res.body)
          expect(res.body.length).toBe(2);
        });
    });
  
  });
  
  describe('POST', () => {
    test('should create task successfully', async () => {
      await request
        .post('/person')
        .set('Accept', 'application/json')
        .send(TEST_PERSON_DATA)
        .expect(201)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.id).not.toBe('7cf9de3e-b621-4842-b41b-433ade67dc15');
        });
    });
  
    test('should get a person by id', async () => {
      // await request
      //   .post('/person')
      //   .set('Accept', 'application/json')
      //   .send(TEST_PERSON_DATA)
      //   .expect(201)
      //   .expect('Content-Type', /json/)
      //   .then(res => {
      //     expect(res.body.id).toBe('7cf9de3e-b621-4842-b41b-433ade67dc15');
      //     person = res.body;
      //   });
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
    test('not found id delete person', async () => {
      console.log('object', person)
      await request
        .delete(`/person/${person.id}123`)
        .then(res => {
          console.log('person', person)
          expect(res.status).toBe(400);
        })
  
      // await request
      //   .get(`/person/${person.id}`)
      //   .expect(404);
    });
  });
})

