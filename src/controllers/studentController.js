const studentService = require("../services/studentService");

const studentController = {
  async getAll(req, res) {
    try {
      const { page, pageSize } = req.pagination;
      const { orderBy, order } = req.sorting;
      const { students, total } = await studentService.findMany(
        page,
        pageSize,
        orderBy,
        order,
      );
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

  async getById(req, res) {
    try {
      const student = await studentService.findUnique(req.params.id);
      return res.status(200).json({ student });
    } catch (error) {
      return res.status(error.statusCode ?? 500).json({
        error: error.statusCode ? error.message : "Erro interno do servidor.",
      });
    }
  },

  async update(req, res) {
    try {
      const student = await studentService.update(req.params.id, req.body);
      return res.status(200).json({ student });
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

  async delete(req, res) {
    try {
      await studentService.delete(req.params.id);
      // 204 No Content: remoção bem-sucedida, sem corpo na resposta.
      return res.status(204).send();
    } catch (error) {
      return res
        .status(error.statusCode ?? 500)
        .json({ error: error.statusCode ? error.message : "Erro interno do servidor." });
    }
  },
};

module.exports = studentController;
