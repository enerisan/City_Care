const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const incidents = await tables.incident.readAll();
    res.json(incidents);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const incident = await tables.incident.read(req.params.id);

    if (incident == null) {
      res.sendStatus(404);
    } else {
      res.json(incident);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const incident = { ...req.body, id: req.params.id };
  try {
    await tables.incident.update(incident);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const incident = req.body;
  try {
    const insertId = await tables.incident.create(incident);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.incident.delete(req.params.id);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = { browse, read, edit, add, destroy };
