import { TestData } from "./interfaces.js";

export function groupByCollumnType(tests: Array<TestData>, type: string) {
    if (type === "categories") {
        let categories = tests.map((test: TestData) => test.categoryName);
        categories = categories.filter((category: string, i: number) => categories.indexOf(category) === i);
        const testsByCategory = categories.map((category: string) => {
            return {
                name: category,
                tests: tests.filter((test: TestData) => test.categoryName === category)
            };
        });
        return testsByCategory;
    }
    else if (type === "disciplines") {
        let disciplines = tests.map((test: TestData) => test.disciplineName);
        disciplines = disciplines.filter((discipline: string, i: number) => disciplines.indexOf(discipline) === i);
        const testsByDiscipline = disciplines.map((discipline: string) => {
            return {
                name: discipline,
                tests: tests.filter((test: TestData) => test.disciplineName === discipline)
            };
        });
        return testsByDiscipline;
    }
    else if (type === "terms") {
        let terms = tests.map((test: TestData) => test.termNumber);
        terms = terms.filter((term: number, i: number) => terms.indexOf(term) === i);
        const testsByTerm = terms.map((term: number) => {
            return {
                number: term,
                tests: tests.filter((test: TestData) => test.termNumber === term)
            };
        });
        return testsByTerm;
    }
    else {
        let teachers = tests.map((test: TestData) => test.teacherName);
        teachers = teachers.filter((teacher: string, i: number) => teachers.indexOf(teacher) === i);
        const testsByTeacher = teachers.map((teacher: string) => {
            return {
                name: teacher,
                tests: tests.filter((test: TestData) => test.teacherName === teacher)
            };
        });
        return testsByTeacher;
    }
}

