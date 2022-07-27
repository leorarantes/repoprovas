import supertest from 'supertest';
import {jest} from '@jest/globals';

import app from "../src/app";
import { createUser, user } from "./factories/authFactory.js";
import prisma from "../src/database.js";

const agent = supertest(app);
jest.setTimeout(15000);

beforeEach(async () => {
    await prisma.$executeRaw`DELETE FROM users WHERE email = ${user.email}`;
});

describe("POST /sign-up", () => {
    it("given valid email and password, create user", async () => {
        const response = await agent.post("/sign-up").send({ email: user.email, password: user.password, confirmPassword: user.password });
        expect(response.status).toBe(200);
    });

    it("given email already in use, fail to create user", async () => {
        await createUser();
        const response = await agent.post("/sign-up").send({ email: user.email, password: user.password, confirmPassword: user.password });
        expect(response.status).toBe(409);
    });
});

describe("POST /sign-in", () => {
    it("given valid email and password, receive token", async () => {
        await createUser();
        const response = await agent.post("/sign-in").send({ email: user.email, password: user.password });
        expect(response.status).toBe(201);
    });

    it("given invalid email and password, fail to receive token", async () => {
        await createUser();
        const response = await agent.post("/sign-in").send({ email: user.email, password: 'invalid_password' });
        expect(response.status).toBe(401);
    });
});

afterAll(async () => {
    await prisma.$executeRaw`DELETE FROM users WHERE email = ${user.email}`;
});