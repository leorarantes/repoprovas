import supertest from 'supertest';

import app from "../src/app";
import { createUser, getToken, user } from "./factories/authFactory.js";
import prisma from "../src/database.js";

const agent = supertest(app);

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
                name: "testeteste",
                pdfUrl: "http://testeteste.com",
                category: "Projeto",
                discipline: "HTML e CSS",
                teachers: "Diego Pinho"
            })
            .set("Authorization", "bearer" + token);
        expect(response.status).toBe(200);
    });

    it("given valid token and invalid category, fail to create test", async () => {
        const { token } = await getToken();
        const response = await agent
            .post("/tests")
            .send({
                name: "testeteste",
                pdfUrl: "http://testeteste.com",
                category: "Inválida",
                discipline: "HTML e CSS",
                teachers: "Diego Pinho"
            })
            .set("Authorization", "bearer" + token);
        expect(response.status).toBe(404);
    });

    it("given valid token and invalid discipline, fail to create test", async () => {
        const { token } = await getToken();
        const response = await agent
            .post("/tests")
            .send({
                name: "testeteste",
                pdfUrl: "http://testeteste.com",
                category: "Projeto",
                discipline: "Inválida",
                teachers: "Diego Pinho"
            })
            .set("Authorization", "bearer" + token);
        expect(response.status).toBe(404);
    });

    it("given valid token and invalid teacher, fail to create test", async () => {
        const { token } = await getToken();
        const response = await agent
            .post("/tests")
            .send({
                name: "testeteste",
                pdfUrl: "http://testeteste.com",
                category: "Projeto",
                discipline: "HTML e CSS",
                teachers: "Bruna Hamori"
            })
            .set("Authorization", "bearer" + token);
        expect(response.status).toBe(409);
    });

    it("given invalid token, fail to create test", async () => {
        const token = "invalid_token";
        const response = await agent
            .post("/tests")
            .send({
                name: "testeteste",
                pdfUrl: "http://testeteste.com",
                category: "Projeto",
                discipline: "HTML e CSS",
                teachers: "Diego Pinho"
            })
            .set("Authorization", "bearer" + token);
        expect(response.status).toBe(401);
    });
});

describe("GET /tests/terms", () => {
    it("given valid token, get tests by term", async () => {
        const { token } = await getToken();
        const response = await agent
            .get("/tests/terms")
            .set("Authorization", "bearer" + token);
        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("given invalid token, fail to get tests by term", async () => {
        const token = "invalid_token";
        const response = await agent
            .get("/tests/terms")
            .set("Authorization", "bearer" + token);
        expect(response.status).toBe(401);
    });
});

describe("GET /tests/teachers", () => {
    it("given valid token, get tests by teacher", async () => {
        const { token } = await getToken();
        const response = await agent
            .get("/tests/teachers")
            .set("Authorization", "bearer" + token);
        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("given invalid token, fail to get tests by teacher", async () => {
        const token = "invalid_token";
        const response = await agent
            .get("/tests/teachers")
            .set("Authorization", "bearer" + token);
        expect(response.status).toBe(401);
    });
});

afterAll(async () => {
    await prisma.$executeRaw`DELETE FROM users WHERE email = ${user.email}`;
    await prisma.$executeRaw`DELETE FROM tests WHERE name = 'testeteste'`;
});
