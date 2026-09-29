const prisma = require("../database/prisma");

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
