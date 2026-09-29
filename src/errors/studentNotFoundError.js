const ApiError = require("./apiError");

class StudentNotFoundError extends ApiError {
  constructor(message = "Aluno não encontrado.") {
    super(message, 404);
  }
}

module.exports = StudentNotFoundError;
