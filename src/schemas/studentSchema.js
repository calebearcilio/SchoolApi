const z = require("zod");

const createStudentSchema = z.object({
  name: z
    .string()
    .max(100, "Nome deve ter no máximo 100 caracteres.")
    .min(5, "Nome deve ter no mínimo 5 caracteres."),
  email: z.email("Formato de email inválido."),
});

module.exports = createStudentSchema;