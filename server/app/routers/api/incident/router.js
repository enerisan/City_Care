const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  add,
  edit,
  destroy,
} = require("../../../controllers/incidentActions");

/* const validateIncidentSchema = require("../../../middlewares/validateIncidentSchema"); */

router.get("/", browse);
router.get("/:id", read);
router.post("/", /*  validateIncidentSchema, */ add);
router.put("/:id", edit);
router.delete("/:id", destroy);

module.exports = router;
