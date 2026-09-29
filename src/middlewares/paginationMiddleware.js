const PaginationError = require("../errors/paginationError");
const paginationSchema = require("../schemas/paginationSchema");
const formatZodErrors = require("../utils/formatZodErrors");

const pagination = (req, res, next) => {
  try {
    const result = paginationSchema.safeParse(req.query);

    if (!result.success) {
      throw new PaginationError(
        "Verifique os parâmetros de paginação.",
        formatZodErrors(result.error.issues)
      );
    }

    req.pagination = result.data;
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = pagination;