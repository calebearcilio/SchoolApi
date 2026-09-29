const studentService = require("../services/studentService");

const studentController = {
  async getAll(req, res) {
    try {
      const { page, pageSize } = req.pagination;
      const { students, total } = await studentService.findMany(page, pageSize);
      return res.status(200).json({ students, total });
    } catch (error) {
      const response = {
        error: error.message ?? "Erro interno do servidor.",
      };

      if (error.errors?.length) {
        response.errors = error.errors;
      }

      return res.status(error.statusCode ?? 500).json(response);
    }
  },

  async post(req, res) {
    try {
      const student = await studentService.create(req.body);
      return res.status(201).json({ student });
    } catch (error) {
      const response = {
        error: error.message ?? "Erro interno do servidor.",
      };

      if (error.errors?.length) {
        response.errors = error.errors;
      }

      return res.status(error.statusCode ?? 500).json(response);
    }
  },
};

module.exports = studentController;
