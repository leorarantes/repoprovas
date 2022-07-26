import supertest from 'supertest';
import bcrypt from "bcrypt";

import prisma from "../../src/database.js";
import app from "../../src/app.js";

const agent = supertest(app);

export const user = {
    email: "teste@email.com",
    password: "123456"
};

export async function createUser() {
    await prisma.users.create({
        data: {
            email: user.email,
            password: bcrypt.hashSync(user.password, 14)
        }
    });
}

export async function getToken() {
    const response = await agent.post("/sign-in").send({ email: user.email, password: user.password });
    const token = response.body;
    return token;
}