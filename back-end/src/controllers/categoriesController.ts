import { Categories } from "@prisma/client";
import { Request, Response } from "express";

import * as categoriesService from "../services/categoriesService.js";
import { CategoryData } from "../repositories/categoriesRepository.js";

export async function get(req: Request, res: Response) {
    const response: CategoryData[] = await categoriesService.get();
    res.status(200).send(response);
}