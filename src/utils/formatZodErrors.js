const formatZodErrors = (issues) =>
  issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));

module.exports = formatZodErrors;