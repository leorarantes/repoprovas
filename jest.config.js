/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

export default {
    preset: "ts-jest",
    testEnvironment: "node",
    extensionsToTreatAsEsm: [".ts"],
    globals: {
        "ts-jest": {
            useESM: true,
        },
    },
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
    },
};
/*
export {
    terms: [{
        number: 1,
        disciplines: [{
            name: "HTLM e CSS",
            categories: [{
                name: "Prova prática",
                tests: [{
                    id: 1,
                    pdfUrl: "ewkejslkas.com",
                    categoryId,
                    teacherDisciplineId
                }]
            }]
        }]
    }]
}
*/