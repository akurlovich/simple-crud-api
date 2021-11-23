const Person = require("../src/controller.js");
// const { getReqData } = require("./utils");

describe('Test e2e', () => {
  const a = 10;
  test('valid confug', () => {
    expect(a).toBe(10);
  });
});

test('Get all persons', async () => {
  const data = await fetch('http://localhost:4000/');
  expect(data).toBe([]);
  // test('get all', async () => {
  //   const allPerson = await fetch('http//localhost:4000');
  // })
})
