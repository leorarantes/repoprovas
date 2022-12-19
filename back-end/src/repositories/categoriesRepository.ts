import { Categories } from "@prisma/client";
import prisma from "../database.js";

export type CategoryData = Omit<Categories, "tests">

export async function getByName(name: string) {
    const category: Categories = await prisma.categories.findFirst({where: {
        name
    }});
    return category;
}

export async function getAll() {
    const categories: CategoryData[] = await prisma.categories.findMany({
        select: {
            id: true,
            name: true
        }
    });
    return categories;
}