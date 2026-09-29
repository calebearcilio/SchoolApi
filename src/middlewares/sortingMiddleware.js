const SortingError = require("../errors/sortingError");
const sortingSchema = require("../schemas/sortingSchema");
const formatZodErrors = require("../utils/formatZodErrors");

const sorting = (req, res, next) => {
  try {
    const result = sortingSchema.safeParse(req.query);

    if (!result.success) {
      throw new SortingError(
        "Verifique os parâmetros de ordenação.",
        formatZodErrors(result.error.issues),
      );
    }

    req.sorting = result.data;
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = sorting;
