const { v4, validate } = require("uuid");

const data = [];

class Controller {
  async getAllPersons() {
    return new Promise((resolve, _) => resolve(data));
  }

  async getPerson(id) {
    return new Promise((resolve, reject) => {
      if (!validate(id)) {
        reject('No valid person id')
      }
      let person = data.find((person) => person.id === id);
      if (person) {
        resolve(person);
      } else {
        reject(`Person with id ${id} not found`);
      }
    });
  }

  async createPerson(person) {
    return new Promise((resolve, reject) => {
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

      resolve(newPerson);
    });
  }

  async updatePerson(id, personNewData) {
    return new Promise((resolve, reject) => {
      if (!validate(id)) {
        reject('No valid person id')
      }
      const personIndex = data.findIndex((person) => person.id === id);
      if (personIndex === -1) {
        reject(`No person with id ${id} found`);
      }

      const newPerson = {
        id,
        ...(JSON.parse(personNewData)),
      };

      data[personIndex] = newPerson;
      resolve(data[personIndex]);
    });
  }

  async deletePerson(id) {
    return new Promise((resolve, reject) => {
      if (!validate(id)) {
        reject('No valid person id')
      }
      const personIndex = data.findIndex((person) => person.id === id);
      if (personIndex === -1) {
        reject(`No person with id ${id} found`);
      }
      resolve(`Person ${id} deleted successfully`);
      data.splice(personIndex, 1);
    });
  }
}
module.exports = Controller;