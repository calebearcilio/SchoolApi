const ApiError = require("./apiError");

class StudentDataError extends ApiError {
  constructor(message = "Dados do estudante inválidos.") {
    super(message, 400);
  }
}

class DuplicateEmailError extends StudentDataError {
  constructor() {
    super("O email informado já está cadastrado.");
  }
}

module.exports = {
  StudentDataError,
  DuplicateEmailError,
};
