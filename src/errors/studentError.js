const ApiError = require("./apiError");

class StudentDataError extends ApiError {
  constructor(message = "Dados do estudante inválidos.", errors = []) {
    super(message, 400, errors);
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
