import { TeachersDisciplines } from "@prisma/client";

import prisma from "../database.js";

export async function getByDisciplineAndTeacherIds(disciplineId: number, teacherId: number) {
    const teachersDisciplines: TeachersDisciplines = await prisma.teachersDisciplines.findFirst({
        where: {
            teacherId,
            disciplineId
        }
    });
    return teachersDisciplines;
}

export async function getTestsByTeacher() {
    const testsByTeacher = await prisma.teachersDisciplines.findMany({
        select: {
            id: true,
            disciplines: true,
            teachers: {
                select: {
                    id: true,
                    name: true,
                    teachersDisciplines: {
                        select: {
                            disciplines: {
                                select: {
                                    id: true,
                                    name: true,
                                    terms: true
                                }
                            }
                        }
                    }
                }
            },
            tests: {
                include: {
                    categories: true
                }
            }
        }
    });
    return testsByTeacher;
}