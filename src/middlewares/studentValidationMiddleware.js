const createStudentSchema = require("../schemas/studentSchema");
const formatZodErrors = require("../utils/formatZodErrors");

const validateStudent = (req, res, next) => {
  try {
    const result = createStudentSchema.safeParse(req.body ?? {});

    if (!result.success) {
      throw new StudentDataError("Verifique os dados informados.", formatZodErrors(
        result.error.issues
      ));
    }

    req.body = result.data;
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = validateStudent;