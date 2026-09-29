const z = require("zod");

const createStudentSchema = z.object({
  name: z
    .string()
    .max(100, "Nome deve ter no máximo 100 caracteres.")
    .min(5, "Nome deve ter no mínimo 5 caracteres."),
  email: z.email("Formato de email inválido."),
});

const updateStudentSchema = createStudentSchema
  .partial()
  .refine((student) => Object.keys(student).length > 0, {
    message: "Informe ao menos um campo para atualizar.",
  });

module.exports = {
  createStudentSchema,
  updateStudentSchema,
};
