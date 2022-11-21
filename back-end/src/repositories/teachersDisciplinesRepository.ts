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