import { Categories, Disciplines, Teachers, TeachersDisciplines, Terms } from "@prisma/client";

import "../setup.js";
import * as testsRepository from "../repositories/testsRepository.js";
import * as categoriesRepository from "../repositories/categoriesRepository.js";
import * as disciplinesRepository from "../repositories/disciplinesRepository.js";
import * as teachersRepository from "../repositories/teachersRepository.js";
import * as termsRepository from "../repositories/termsRepository.js";
import * as teachersDisciplinesRepository from "../repositories/teachersDisciplinesRepository.js";

export async function create(teacher: string, discipline: string, category: string, pdfUrl: string, name: string) {
    // ensure teacher exists with name
    const existingTeacher: Teachers = await teachersRepository.getByName(teacher);
    if (!existingTeacher) throw { type: "error_not_found", message: "Teacher doesnt exist." };

    // ensure discipline exists with name
    const existingDiscipline: Disciplines = await disciplinesRepository.getByName(discipline);
    if (!existingDiscipline) throw { type: "error_not_found", message: "Discipline doesnt exist." };

    // ensure teacher teaches discipline
    const teacherDiscipline: TeachersDisciplines = await teachersDisciplinesRepository.getByDisciplineAndTeacherIds(existingDiscipline.id, existingTeacher.id);
    if (!teacherDiscipline) throw { type: "error_conflict", message: "Teacher doesnt teach discipline." };

    // ensure category exists
    const existingCategory: Categories = await categoriesRepository.getByName(category);
    if (!existingCategory) throw { type: "error_not_found", message: "Category doesnt exist." };

    await testsRepository.create(name, pdfUrl, existingCategory.id, teacherDiscipline.id);
}

export async function getByDiscipline() {
    const testsByDiscipline = await termsRepository.getTestsByTerm();
    const response = testsByDiscipline.map(term => {
        return {
            id: term.id,
            number: term.number,
            disciplines: term.disciplines.map(discipline => {
                return {
                    id: discipline.id,
                    name: discipline.name,
                    teacherDisciplines: discipline.teachersDisciplines.map(teacherDiscipline => {
                        return {
                            id: teacherDiscipline.id,
                            discipline: {
                                id: teacherDiscipline.disciplines.id,
                                name: teacherDiscipline.disciplines.name,
                                term: teacherDiscipline.disciplines.terms
                            },
                            teacher: teacherDiscipline.teachers,
                            tests: teacherDiscipline.tests.map(test => {
                                return {
                                    id: test.id,
                                    name: test.name,
                                    pdfUrl: test.pdfUrl,
                                    category: test.categories
                                }
                            })
                        }
                    }),
                    term: discipline.terms
                }
            })
        }
    });
    return response;
}

export async function getByTeacher() {
    const testsByTeacher = await teachersDisciplinesRepository.getTestsByTeacher();
    const response = testsByTeacher.map(teachersDisciplines => {
        return {
            id: teachersDisciplines.id,
            discipline: teachersDisciplines.disciplines,
            teacher: {
                id: teachersDisciplines.teachers.id,
                name: teachersDisciplines.teachers.name
            },
            tests: teachersDisciplines.tests,
            disciplines: teachersDisciplines.teachers.teachersDisciplines.map(element => {
                return {
                    id: element.disciplines.id,
                    name: element.disciplines.name,
                    term: element.disciplines.terms
                }
            })
        }
    });
    return response;
}