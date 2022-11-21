import { Disciplines } from "@prisma/client";

import prisma from "../database.js";

export async function getByName(name: string) {
    const disciplines: Disciplines = await prisma.disciplines.findFirst({where: {
        name
    }});
    return disciplines;
}