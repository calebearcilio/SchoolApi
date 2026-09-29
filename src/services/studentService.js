const prisma = require("../database/prisma");
const {
  StudentDataError,
  DuplicateEmailError,
} = require("../errors/studentError");
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

  async update(id, student) {
    const parsedId = parseId(id);
    await this.findUnique(parsedId);

    try {
      return await prisma.student.update({
        where: { id: parsedId },
        data: student,
      });
    } catch (error) {
      if (error?.code === "P2002") {
        throw new DuplicateEmailError();
      }

      throw error;
    }
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

  async delete(id) {
    const parsedId = parseId(id);

    // Verifica a existência antes de remover (404 se não existir).
    await this.findUnique(parsedId);

    await prisma.student.delete({ where: { id: parsedId } });
  },
};

module.exports = studentService;
