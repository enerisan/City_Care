const AbstractRepository = require("./AbstractRepository");

class incidentRepository extends AbstractRepository {
  constructor() {
    super({ table: "ingredient" });
  }

  async create(incident) {
    const [result] = await this.database.query(
      `insert into ${this.table} ( title,
        latitude,
        longitude,
        street,
        street_number,
        zip_code,
        image,
        description,
        date,
        user_id,
        category_id,
        status_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
      [
        incident.title,
        incident.latitude,
        incident.longitude,
        incident.street,
        incident.street_number,
        incident.zip_code,
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
      `update ${this.table} set title = ?, latitude = ?, longitude = ?, street= ?, street_number = ?, zip_code = ?, image= ?, description= ?, date = ?, user_id= ?, category_id = ?, status_id = ? where id = ?`,
      [
        incident.title,
        incident.latitude,
        incident.longitude,
        incident.street,
        incident.street_number,
        incident.zip_code,
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

module.exports = incidentRepository;
