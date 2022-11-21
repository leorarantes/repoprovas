import { Categories } from "@prisma/client";

import prisma from "../database.js";

export async function getByName(name: string) {
    const categories: Categories = await prisma.categories.findFirst({where: {
        name
    }});
    return categories;
}