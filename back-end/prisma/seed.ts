import { Categories, Disciplines, Teachers, TeachersDisciplines, Terms } from '@prisma/client';
import pkg from "@prisma/client";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function main() {
    const terms = [{ number: 1 }, { number: 2 }, { number: 3 }, { number: 4 }, { number: 5 }, { number: 6 }];
    const categories = [{ name: 'Projeto' }, { name: 'Prática' }, { name: 'Recuperação' }];
    const disciplines = [{ name: 'HTML e CSS', termId: 1 }, { name: 'JavaScript', termId: 2 }, { name: 'React', termId: 3 }, { name: 'Humildade', termId: 1 }, { name: 'Planejamento', termId: 2 }, { name: 'Autoconfiança', termId: 3 }];
    const teachers = [{ name: 'Diego Pinho' }, { name: 'Bruna Hamori' }];
    const teachersDisciplines = [{ teacherId: 1, disciplineId: 1 }, { teacherId: 1, disciplineId: 2 }, { teacherId: 1, disciplineId: 3 }, { teacherId: 2, disciplineId: 4 }, { teacherId: 2, disciplineId: 5 }, { teacherId: 2, disciplineId: 6 }];

    const existingTerm: Terms = await prisma.terms.findFirst();
    if (!existingTerm) {
        await prisma.terms.createMany({
            data: terms
        });
    }

    const existingCategory: Categories = await prisma.categories.findFirst();
    if (!existingCategory) {
        await prisma.categories.createMany({
            data: categories
        });
    }

    const existingDiscipline: Disciplines = await prisma.disciplines.findFirst();
    if (!existingDiscipline) {
        await prisma.disciplines.createMany({
            data: disciplines
        });
    }

    const existingTeacher: Teachers = await prisma.teachers.findFirst();
    if (!existingTeacher) {
        await prisma.teachers.createMany({
            data: teachers
        });
    }

    const existingTeachersDisciplines: TeachersDisciplines = await prisma.teachersDisciplines.findFirst();
    if (!existingTeachersDisciplines) {
        await prisma.teachersDisciplines.createMany({
            data: teachersDisciplines
        });
    }
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (error) => {
        console.error(error)
        await prisma.$disconnect()
        process.exit(1)
    })