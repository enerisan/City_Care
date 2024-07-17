const AbstractSeeder = require("./AbstractSeeder");

const status = ["envoyé", "en cours", "resolu"];

class StatusSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "status", truncate: true });
  }

  run() {
    for (let i = 0; i < status.length; i += 1) {
      const fakeStatus = {
        type: status[i],
        refName: `role_${i}`,
      };

      this.insert(fakeStatus);
    }
  }
}

module.exports = StatusSeeder;
