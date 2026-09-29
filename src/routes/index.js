const { Router } = require("express");
const studentRoutes = require("./studentRoutes");

const routes = Router();

routes.use(studentRoutes);

module.exports = routes;
