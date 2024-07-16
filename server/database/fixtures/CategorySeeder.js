const AbstractSeeder = require("./AbstractSeeder");

const categories = [
  "trottoirs",
  "arbres et jardins",
  "chaussée",
  "conteneurs",
  "sports",
  "bâtiments publics",
  "lampadaires",
  "fontaines",
  "propreté",
  "poubelles",
  "aire de jeux",
  "insectes",
  "égouts",
  "circulation",
  "autres",
];

class CategorySeeder extends AbstractSeeder {
  constructor() {
    super({ table: "category", truncate: true });
  }

  run() {
    for (let i = 0; i < categories.length; i += 1) {
      const fakeCategory = {
        type: categories[i],
        refName: `category_${i}`,
      };

      this.insert(fakeCategory);
    }
  }
}

module.exports = CategorySeeder;
