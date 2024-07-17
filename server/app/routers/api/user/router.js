const express = require("express");

const router = express.Router();

const {
  browse,
  readUserAndIncidents,
  edit,
  add,
  destroy,
} = require("../../../controllers/userActions");

const validateUserSchema = require("../../../middlewares/validateUserSchema");
const hashPassword = require("../../../services/hashPassword");

router.get("/", browse);

router.get("/:id", readUserAndIncidents);

router.put("/:id", edit);

router.post("/", validateUserSchema, hashPassword, add);

router.delete("/:id", destroy);

module.exports = router;
