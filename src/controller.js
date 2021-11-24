const { v4, validate } = require("uuid");
// const data = require("./data");

const data = [];

class Controller {
  // getting all todos
  async getAllPersons() {
    // return all todos
    return new Promise((resolve, _) => resolve(data));
  }

  // getting a single todo
  async getPerson(id) {
    return new Promise((resolve, reject) => {
      // get the todo
      if (!validate(id)) {
        reject('No valid person id')
      }
      let person = data.find((person) => person.id === id);
      if (person) {
        // return the todo
        resolve(person);
      } else {
        // return an error
        reject(`Person with id ${id} not found`);
      }
    });
  }

  // creating a todo
  async createPerson(person) {
    return new Promise((resolve, reject) => {
      // create a todo, with random id and data sent
      // if (person.name && person.age && person.hobbies) {
      //   reject(`Person field 'name', 'age' and 'hobbies' are required`);
      // };
      if (!person.name) {
        reject(`Person field 'name', 'age' and 'hobbies' are required`);
      };

      if (!person.age) {
        reject(`Person field 'name', 'age' and 'hobbies' are required`);
      };

      if (!person.hobbies) {
        reject(`Person field 'name', 'age' and 'hobbies' are required`);
      };

      let newPerson = {
        id: v4(),
        ...person,
      };

      data.push(newPerson);

      // return the new created todo
      resolve(newPerson);
    });
  }

  // updating a todo
  async updatePerson(id, personNewData) {
    return new Promise((resolve, reject) => {
      // get the todo.
      if (!validate(id)) {
        reject('No valid person id')
      }
      const personIndex = data.findIndex((person) => person.id === id);
      // console.log(personIndex)
      // if no todo, return an error
      if (personIndex === -1) {
        reject(`No person with id ${id} found`);
      }
      // return the updated todo
      // console.log(JSON.parse(personNewData));

      const newPerson = {
        id,
        ...(JSON.parse(personNewData)),
      };

      // console.log(newPerson)

      data[personIndex] = newPerson;
      resolve(data[personIndex]);
    });
  }

  // deleting a todo
  async deletePerson(id) {
    return new Promise((resolve, reject) => {
      if (!validate(id)) {
        reject('No valid person id')
      }
      // get the todo
      // let person = data.find((person) => person.id === id);
      const personIndex = data.findIndex((person) => person.id === id);
      // if no todo, return an error
      if (personIndex === -1) {
        reject(`No person with id ${id} found`);
      }
      // else, return a success message
      resolve(`Person ${id} deleted successfully`);
      data.splice(personIndex, 1);
    });
  }
}
module.exports = Controller;