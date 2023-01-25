import { Users } from "@prisma/client";

import prisma from "../database.js";

export async function create(email: string, password: string) {
    await prisma.users.create({data: {
        email,
        password
    }});
}

export async function getByEmail(email: string) {
    const user: Users = await prisma.users.findFirst({where: {
        email
    }});
    return user;
}

export async function getByPassword(password: string) {
    const users: any = await prisma.users.findMany({where: {
        password
    }});
    return users;
}