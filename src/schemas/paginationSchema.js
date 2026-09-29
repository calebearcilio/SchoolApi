const z = require("zod");

const paginationSchema = z.object({
  page: z.coerce
    .number()
    .int("page deve ser um inteiro.")
    .min(1, "page deve ser maior ou igual a 1.")
    .default(1),
  pageSize: z.coerce
    .number()
    .int("pageSize deve ser um inteiro.")
    .min(1, "pageSize deve ser maior ou igual a 1.")
    .default(10),
});

module.exports = paginationSchema;
