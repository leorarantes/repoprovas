import supertest from 'supertest';
import {jest} from '@jest/globals';

import app from "../src/app";
import { createUser, getToken, user } from "./factories/authFactory.js";
import prisma from "../src/database.js";

const agent = supertest(app);
jest.setTimeout(10000);

beforeAll(async () => {
    await prisma.$executeRaw`DELETE FROM users WHERE email = ${user.email}`;
    await createUser();
});

beforeEach(async () => {
    await prisma.$executeRaw`DELETE FROM tests WHERE name = 'testeteste'`;
});

describe("POST /tests", () => {
    it("given valid token and body, create test", async () => {
        const { token } = await getToken();
        const response = await agent
            .post("/tests")
            .send({
                teacher: "Diego Pinho",
                discipline: "HTML e CSS",
                category: "Projeto",
                pdfUrl: "http://testeteste.com",
                name: "testeteste"
            })
            .set("Authorization", "bearer " + token);
        expect(response.status).toBe(200);
    });

    it("given valid token and invalid category, fail to create test", async () => {
        const { token } = await getToken();
        const response = await agent
            .post("/tests")
            .send({
                teacher: "Diego Pinho",
                discipline: "HTML e CSS",
                category: "Inválida",
                pdfUrl: "http://testeteste.com",
                name: "testeteste"
            })
            .set("Authorization", "bearer " + token);
        expect(response.status).toBe(404);
    });

    it("given valid token and invalid discipline, fail to create test", async () => {
        const { token } = await getToken();
        const response = await agent
            .post("/tests")
            .send({
                teacher: "Diego Pinho",
                discipline: "Inválida",
                category: "Projeto",
                pdfUrl: "http://testeteste.com",
                name: "testeteste"
            })
            .set("Authorization", "bearer " + token);
        expect(response.status).toBe(404);
    });

    it("given valid token and invalid teacher, fail to create test", async () => {
        const { token } = await getToken();
        const response = await agent
            .post("/tests")
            .send({
                teacher: "Bruna Hamori",
                discipline: "HTML e CSS",
                category: "Projeto",
                pdfUrl: "http://testeteste.com",
                name: "testeteste"
            })
            .set("Authorization", "bearer " + token);
        expect(response.status).toBe(409);
    });

    it("given invalid token, fail to create test", async () => {
        const token = "invalid_token";
        const response = await agent
            .post("/tests")
            .send({
                teacher: "Diego Pinho",
                discipline: "HTML e CSS",
                category: "Projeto",
                pdfUrl: "http://testeteste.com",
                name: "testeteste"
            })
            .set("Authorization", "bearer " + token);
        expect(response.status).toBe(401);
    });
});

describe("GET /tests/terms", () => {
    it("given valid token, get tests by term", async () => {
        const { token } = await getToken();
        const response = await agent
            .get("/tests/terms")
            .set("Authorization", "bearer " + token);
        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("given invalid token, fail to get tests by term", async () => {
        const token = "invalid_token";
        const response = await agent
            .get("/tests/terms")
            .set("Authorization", "bearer " + token);
        expect(response.status).toBe(401);
    });
});

describe("GET /tests/teachers", () => {
    it("given valid token, get tests by teacher", async () => {
        const { token } = await getToken();
        const response = await agent
            .get("/tests/teachers")
            .set("Authorization", "bearer " + token);
        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("given invalid token, fail to get tests by teacher", async () => {
        const token = "invalid_token";
        const response = await agent
            .get("/tests/teachers")
            .set("Authorization", "bearer " + token);
        expect(response.status).toBe(401);
    });
});

afterAll(async () => {
    await prisma.$executeRaw`DELETE FROM users WHERE email = ${user.email}`;
    await prisma.$executeRaw`DELETE FROM tests WHERE name = 'testeteste'`;
});
