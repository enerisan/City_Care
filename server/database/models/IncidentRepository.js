const AbstractRepository = require("./AbstractRepository");

class IncidentRepository extends AbstractRepository {
  constructor() {
    super({ table: "incident" });
  }

  async create(incident) {
    const [result] = await this.database.query(
      `insert into ${this.table} ( title,
       address,
        image,
        description,
        date,
        user_id,
        category_id,
        status_id) values (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        incident.title,
        incident.address,
        incident.image,
        incident.description,
        incident.date,
        incident.user_id,
        incident.category_id,
        incident.status_id,
      ]
    );

    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);

    return rows;
  }

  async update(incident) {
    const [result] = await this.database.query(
      `update ${this.table} set title = ?,  address = ?, image= ?, description= ?, date = ?, user_id= ?, category_id = ?, status_id = ? where id = ?`,
      [
        incident.title,
        incident.address,
        incident.image,
        incident.description,
        incident.date,
        incident.user_id,
        incident.category_id,
        incident.status_id,
      ]
    );

    return result;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `delete from ${this.table} where id=?`,
      [id]
    );

    return result;
  }
}

module.exports = IncidentRepository;
