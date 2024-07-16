const AbstractSeeder = require("./AbstractSeeder");

class UserSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "user", truncate: true });
  }

  run() {
    for (let i = 0; i < 2; i += 1) {
      const fakeUser = {
        firstname: this.faker.person.firstName(),
        lastname: this.faker.person.lastName(),
        identity_card: this.faker.vehicle.vin(),
        email: this.faker.internet.email(),
        password: this.faker.internet.password(),
        geolocation: true,
        role_id: this.getRef(`role_${i}`).insertId,
        refName: `user_${i}`,
      };

      this.insert(fakeUser);
    }
  }
}

module.exports = UserSeeder;
