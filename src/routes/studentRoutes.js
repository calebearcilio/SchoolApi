const { Router } = require("express");
const pagination = require("../middlewares/paginationMiddleware");
const validateStudent = require("../middlewares/studentValidationMiddleware");
const studentController = require("../controllers/studentController");

const studentRoutes = Router();

studentRoutes.get("/students", pagination, studentController.getAll);
studentRoutes.post("/students", validateStudent, studentController.post);

module.exports = studentRoutes;