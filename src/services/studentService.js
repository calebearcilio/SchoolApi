const prisma = require("../database/prisma");
const { StudentDataError } = require("../errors/studentError");
const StudentNotFoundError = require("../errors/studentNotFoundError");

function parseId(id) {
  const parsedId = Number(id);

  if (!Number.isInteger(parsedId) || parsedId < 1) {
    throw new StudentDataError("O id informado deve ser um inteiro positivo.");
  }

  return parsedId;
}

const studentService = {
  async findMany(page, pageSize, orderBy, order) {
    const [students, total] = await Promise.all([
      prisma.student.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { [orderBy]: order },
      }),
      prisma.student.count(),
    ]);

    return { students, total };
  },

  async findUnique(id) {
    const student = await prisma.student.findUnique({
      where: { id: parseId(id) },
    });

    if (!student) {
      throw new StudentNotFoundError();
    }

    return student;
  },

  async create(student) {
    try {
      return await prisma.student.create({
        data: {
          name: student.name,
          email: student.email,
        },
      });
    } catch (error) {
      if (error?.code === "P2002") {
        throw new DuplicateEmailError();
      }

      throw error;
    }
  },
};

module.exports = studentService;
