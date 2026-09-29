const prisma = require("../database/prisma");

const studentService = {
  async findMany(page, pageSize) {
    const students = await prisma.student.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return students;
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
