const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const userRouter = require("./user/router");
const authRouter = require("./auth/router");
const incidentRouter = require("./auth/router");

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/incident", incidentRouter);
/* ************************************************************************* */

module.exports = router;
