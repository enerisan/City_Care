const AbstractSeeder = require("./AbstractSeeder");
const UserSeeder = require("./UserSeeder");
const CategorySeeder = require("./CategorySeeder");

class IncidentSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "incident",
      truncate: true,
      dependencies: [UserSeeder, CategorySeeder],
    });
  }

  run() {
    for (let i = 0; i < 3; i += 1) {
      const fakeIncident = {
        title: this.faker.lorem.word(3),
        address: "Puerta del Sol, Madrid, España",
        image: this.faker.helpers.arrayElement([
          "https://unsplash.com/photos/XJXWbfSo2f0/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8dGVjaG5vbG9neXxlbnwwfHx8fDE3MjAwODY5MjV8MA&force=true&w=640",
          "https://cdn.pixabay.com/photo/2014/01/11/18/03/traffic-lights-242323_960_720.jpg",
        ]),
        description: this.faker.lorem.text(),
        date: new Date(),
        user_id: this.getRef(`user_${i}`).insertId,
        category_id: this.getRef(`category_${i}`).insertId,
        status_id: this.getRef(`status_${i}`).insertId,
      };

      this.insert(fakeIncident);
    }
  }
}

module.exports = IncidentSeeder;
