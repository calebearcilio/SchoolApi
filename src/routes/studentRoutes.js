const { Router } = require("express");
const pagination = require("../middlewares/paginationMiddleware");
const sorting = require("../middlewares/sortingMiddleware");
const validateStudent = require("../middlewares/studentValidationMiddleware");
const { validateStudentUpdate } = validateStudent;
const studentController = require("../controllers/studentController");

const studentRoutes = Router();

studentRoutes.get("/students", pagination, sorting, studentController.getAll);
studentRoutes.get("/students/:id", studentController.getById);
studentRoutes.post("/students", validateStudent, studentController.post);
studentRoutes.patch(
  "/students/:id",
  validateStudentUpdate,
  studentController.update,
);

module.exports = studentRoutes;
