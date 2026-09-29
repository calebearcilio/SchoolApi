const ApiError = require("./apiError");

class SortingError extends ApiError {
  constructor(message = "Parâmetros de ordenação inválidos.", errors = []) {
    super(message, 400, errors);
  }
}

module.exports = SortingError;
