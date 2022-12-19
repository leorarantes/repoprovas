export function groupByCollumnType(tests, type) {
    if (type === "categories") {
        var categories_1 = tests.map(function (test) { return test.categoryName; });
        categories_1 = categories_1.filter(function (category, i) { return categories_1.indexOf(category) === i; });
        var testsByCategory = categories_1.map(function (category) {
            return {
                name: category,
                tests: tests.filter(function (test) { return test.categoryName === category; })
            };
        });
        return testsByCategory;
    }
    else if (type === "disciplines") {
        var disciplines_1 = tests.map(function (test) { return test.disciplineName; });
        disciplines_1 = disciplines_1.filter(function (discipline, i) { return disciplines_1.indexOf(discipline) === i; });
        var testsByDiscipline = disciplines_1.map(function (discipline) {
            return {
                name: discipline,
                tests: tests.filter(function (test) { return test.disciplineName === discipline; })
            };
        });
        return testsByDiscipline;
    }
    else if (type === "terms") {
        var terms_1 = tests.map(function (test) { return test.termNumber; });
        terms_1 = terms_1.filter(function (term, i) { return terms_1.indexOf(term) === i; });
        var testsByTerm = terms_1.map(function (term) {
            return {
                number: term,
                tests: tests.filter(function (test) { return test.termNumber === term; })
            };
        });
        return testsByTerm;
    }
    else {
        var teachers_1 = tests.map(function (test) { return test.teacherName; });
        teachers_1 = teachers_1.filter(function (teacher, i) { return teachers_1.indexOf(teacher) === i; });
        var testsByTeacher = teachers_1.map(function (teacher) {
            return {
                name: teacher,
                tests: tests.filter(function (test) { return test.teacherName === teacher; })
            };
        });
        return testsByTeacher;
    }
}
