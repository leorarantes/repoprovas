import { Teachers } from "@prisma/client";

import prisma from "../database.js";

export async function getByName(name: string) {
    const teachers: Teachers = await prisma.teachers.findFirst({
        where: {
            name
        }
    });
    return teachers;
}