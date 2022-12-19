import { Request, Response } from "express";

import * as testsService from "../services/testsService.js";

export async function create(req: Request, res: Response) {
    const { teacher, discipline, category, pdfUrl, name }: { teacher: string, discipline: string, category: string, pdfUrl: string, name: string } = req.body;
    await testsService.create(teacher, discipline, category, pdfUrl, name);
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