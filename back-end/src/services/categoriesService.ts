import { CategoryData } from "../repositories/categoriesRepository.js";
import * as categoriesRepository from "../repositories/categoriesRepository.js";

export async function get() {
    const categories: CategoryData[] = await categoriesRepository.getAll();
    return categories;
}