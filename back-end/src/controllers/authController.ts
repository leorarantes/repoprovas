import { Request, Response } from "express";

import * as authService from "../services/authService.js";

export async function signUp(req: Request, res: Response) {
    const { email, password, confirmPassword }: { email: string, password: string, confirmPassword: string } = req.body;
    await authService.signUp(email, password);
    res.sendStatus(200);
};

export async function signIn(req: Request, res: Response) {
    const { email, password }: { email: string, password: string } = req.body;
    const token = await authService.signIn(email, password);
    res.status(201).send(token);
};

export async function signInWithGitHub(req: Request, res: Response) {
    const { code }: { code: string } = req.body;
    const token = await authService.signInWithGitHub(code);
    res.status(201).send(token);
};