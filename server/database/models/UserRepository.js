const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    super({ table: "user" });
  }

  async create(user) {
    const [result] = await this.database.query(
      `insert into ${this.table} (firstname, lastname, identity_card, email, password, role_id) values (?, ?, ?, ?, ?, ?)`,
      [
        user.firstname,
        user.lastname,
        user.identity_card,
        user.email,
        user.password,
        user.role_id,
        user.id,
      ]
    );

    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT
          user.firstname,
        user.lastname,
        user.identity_card,
        user.email,
        user.password,
        user.role_id,
        user.id,
        
      FROM
        user u
        
      WHERE
        u.id =?`,
      [id]
    );

    return rows;
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);

    return rows;
  }

  async update(user) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET firstname = ?, lastname = ?, identity_card= ?, email = ?, password = ?,  role_id = ? WHERE id = ?`,
      [
        user.firstname,
        user.lastname,
        user.identity_card,
        user.email,
        user.password,
        user.role_id,
        user.id,
      ]
    );

    return result.affectedRows > 0;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return result.affectedRows > 0;
  }

  async findUserByEmail(email) {
    const [result] = await this.database.query(
      `SELECT  email, firstname, password, id FROM ${this.table} WHERE email = ?`,
      [email]
    );
    return result;
  }
}

module.exports = UserRepository;