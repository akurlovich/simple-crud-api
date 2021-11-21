const { v4 } = require("uuid");
const data = require("./data");

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
            let person = data.find((person) => person.id === id);
            if (person) {
                // return the todo
                resolve(person);
            } else {
                // return an error
                reject(`Person with id ${id} not found `);
            }
        });
    }

    // creating a todo
    async createPerson(person) {
        return new Promise((resolve, _) => {
            // create a todo, with random id and data sent
            let newPerson = {
                id: v4(),
                ...person,
            };

            // return the new created todo
            resolve(newPerson);
        });
    }

    // updating a todo
    async updatePerson(id) {
        return new Promise((resolve, reject) => {
            // get the todo.
            let person = data.find((person) => person.id === id);
            // if no todo, return an error
            if (!person) {
                reject(`No person with id ${id} found`);
            }
            // return the updated todo
            resolve(person);
        });
    }

    // deleting a todo
    async deletePerson(id) {
        return new Promise((resolve, reject) => {
            // get the todo
            let person = data.find((person) => person.id === id);
            // if no todo, return an error
            if (!person) {
                reject(`No person with id ${id} found`);
            }
            // else, return a success message
            resolve(`Person deleted successfully`);
        });
    }
}
module.exports = Controller;