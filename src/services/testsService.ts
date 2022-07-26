import { Categories, Disciplines, Teachers, TeachersDisciplines } from "@prisma/client";

import "../setup.js";
import * as testsRepository from "../repositories/testsRepository.js";
import * as categoriesRepository from "../repositories/categoriesRepository.js";
import * as disciplinesRepository from "../repositories/disciplinesRepository.js";
import * as teachersRepository from "../repositories/teachersRepository.js";
import * as testsUtil from "../utils/testsUtil.js";
import * as teachersDisciplinesRepository from "../repositories/teachersDisciplinesRepository.js";
import { TestData } from "../utils/interfaces.js";

export async function create(name: string, pdfUrl: string, category: string, discipline: string, teacher: string) {
    // ensure category exists
    const existingCategory: Categories = await categoriesRepository.getByName(category);
    if (!existingCategory) throw { type: "error_not_found", message: "Category doesnt exist." };

    // ensure discipline exists with name
    const existingDiscipline: Disciplines = await disciplinesRepository.getByName(discipline);
    if (!existingDiscipline) throw { type: "error_not_found", message: "Discipline doesnt exist." };

    // ensure teacher exists with name
    const existingTeacher: Teachers = await teachersRepository.getByName(teacher);
    if (!existingTeacher) throw { type: "error_not_found", message: "Teacher doesnt exist." };

    // ensure teacher teaches discipline
    const teacherDiscipline: TeachersDisciplines = await teachersDisciplinesRepository.getByDisciplineAndTeacherIds(existingDiscipline.id, existingTeacher.id);

    await testsRepository.create(name, pdfUrl, existingCategory.id, teacherDiscipline.id);
}

export async function getByDiscipline() {
    const tests: Array<TestData> = await testsRepository.getAll();

    const testsByCategory: any = testsUtil.groupByCollumnType(tests, "categories");
    const testsByDiscipline: any = testsUtil.groupByCollumnType(tests, "disciplines");
    const testsByTerm: any = testsUtil.groupByCollumnType(tests, "terms");

    const response = {
        terms: testsByTerm.map((term: { number: number, tests: Array<TestData> }) => {
            return {
                number: term.number,
                disciplines: testsByDiscipline.filter((discipline: { name: string, tests: Array<TestData> }) => {
                    const aux = term.tests.find((termTests: TestData) => termTests.disciplineName === discipline.name);
                    return !(aux === undefined);
                }).map((discipline: { name: string, tests: Array<TestData> }) => {
                    return {
                        name: discipline.name,
                        categories: testsByCategory.filter((category: { name: string, tests: Array<TestData> }) => {
                            const aux = discipline.tests.find((disciplineTests: TestData) => disciplineTests.categoryName === category.name);
                            return !(aux === undefined);
                        }).map((category: { name: string, tests: Array<TestData> }) => {
                            return {
                                name: category.name,
                                tests: category.tests.map((test: TestData) => {
                                    return {
                                        id: test.id,
                                        name: test.name,
                                        teacher: test.teacherName
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    };

    return response;
}

export async function getByTeacher() {
    const tests: Array<TestData> = await testsRepository.getAll();

    const testsByCategory: any = testsUtil.groupByCollumnType(tests, "categories");
    const testsByTeacher: any = testsUtil.groupByCollumnType(tests, "teachers");

    const response = {
        terms: testsByTeacher.map((teacher: { name: string, tests: Array<TestData> }) => {
            return {
                name: teacher.name,
                categories: testsByCategory.filter((category: { name: string, tests: Array<TestData> }) => {
                    const aux = teacher.tests.find((teacherTests: TestData) => teacherTests.categoryName === category.name);
                    return !(aux === undefined);
                }).map((category: { name: string, tests: Array<TestData> }) => {
                    return {
                        name: category.name,
                        tests: category.tests.map((test: TestData) => {
                            return {
                                id: test.id,
                                name: test.name,
                                discipline: test.disciplineName
                            }
                        })
                    }
                })
            }
        })
    }

    return response;
}