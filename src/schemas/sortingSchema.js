const z = require("zod");

const validOrderFields = ["id", "name", "email", "createdAt", "updatedAt"];

const sortingSchema = z.object({
  orderBy: z
    .enum(validOrderFields, `ordenações permitidas: ${validOrderFields.join(",")}`)
    .default("id"),
  order: z
    .enum(["asc", "desc"], "order deve ser 'asc' ou 'desc'.")
    .default("asc"),
});

module.exports = sortingSchema;
