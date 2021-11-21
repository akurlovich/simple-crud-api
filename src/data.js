const { v4 } = require('uuid');

const persons = [
  {
    id: v4(),
    name: "Jon",
    age: "30",
    hobbies: ['tennis'],
  },
  {
    id: v4(),
    name: "Max",
    age: "40",
    hobbies: ['football'],
  },
  {
    id: v4(),
    name: "Nina",
    age: "22",
    hobbies: ['swimming'],
  },
  {
    id: v4(),
    name: "Mary",
    age: "54",
    hobbies: ['fishing'],
  },
];
module.exports = persons;