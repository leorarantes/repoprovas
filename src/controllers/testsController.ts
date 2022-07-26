import { Request, Response } from "express";

import * as testsService from "../services/testsService.js";

export async function create(req: Request, res: Response) {
    const { name, pdfUrl, category, discipline, teacher }: { name: string, pdfUrl: string, category: string, discipline: string, teacher: string } = req.body;
    await testsService.create(name, pdfUrl, category, discipline, teacher);
    res.sendStatus(200);
};

export async function getByDiscipline(req: Request, res: Response) {
    const response = await testsService.getByDiscipline();
    res.status(201).send(response);
}

export async function getByTeacher(req: Request, res: Response) {
    const response = await testsService.getByTeacher();
    res.status(201).send(response);
}