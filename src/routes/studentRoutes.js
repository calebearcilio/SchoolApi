const { Router } = require("express");
const pagination = require("../middlewares/paginationMiddleware");
const sorting = require("../middlewares/sortingMiddleware");
const validateStudent = require("../middlewares/studentValidationMiddleware");
const studentController = require("../controllers/studentController");

const studentRoutes = Router();

studentRoutes.get("/students", pagination, sorting, studentController.getAll);
studentRoutes.get("/students/:id", studentController.getById);
studentRoutes.post("/students", validateStudent, studentController.post);

module.exports = studentRoutes;
