const { StudentDataError } = require("../errors/studentError");
const {
  createStudentSchema,
  updateStudentSchema,
} = require("../schemas/studentSchema");
const formatZodErrors = require("../utils/formatZodErrors");

const validate = (schema) => (req, res, next) => {
  try {
    const result = schema.safeParse(req.body ?? {});

    if (!result.success) {
      throw new StudentDataError(
        "Verifique os dados informados.",
        formatZodErrors(result.error.issues),
      );
    }

    req.body = result.data;
    return next();
  } catch (error) {
    return next(error);
  }
};

const validateStudent = validate(createStudentSchema);
const validateStudentUpdate = validate(updateStudentSchema);

module.exports = validateStudent;
module.exports.validateStudentUpdate = validateStudentUpdate;
