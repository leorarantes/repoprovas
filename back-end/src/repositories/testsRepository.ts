import prisma from "../database.js";
import { TestData } from "../utils/interfaces.js";

export async function create(name: string, pdfUrl: string, categoryId: number, teacherDisciplineId: number) {
    await prisma.tests.create({data: {
        name,
        pdfUrl,
        categoryId,
        teacherDisciplineId
    }});
}

export async function getAll() {
    const tests: Array<TestData> = await prisma.$queryRaw`
        SELECT tests.id, tests.name, teachers.name AS "teacherName", categories.name AS "categoryName", disciplines.name AS "disciplineName", terms.number AS "termNumber" FROM tests
        JOIN categories ON tests."categoryId" = categories.id
        JOIN "teachersDisciplines" ON tests."teacherDisciplineId" = "teachersDisciplines".id
        JOIN teachers ON "teachersDisciplines"."teacherId" = teachers.id
        JOIN disciplines ON "teachersDisciplines"."disciplineId" = disciplines.id
        JOIN terms ON disciplines."termId" = terms.id;
    `;
    return tests;
}