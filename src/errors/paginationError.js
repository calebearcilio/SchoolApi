const ApiError = require("./apiError");

class PaginationError extends ApiError {
  constructor(message = "Parâmetros de paginação inválidos.") {
    super(message, 400);
  }
}

module.exports = PaginationError
