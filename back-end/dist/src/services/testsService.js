var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import "../setup.js";
import * as testsRepository from "../repositories/testsRepository.js";
import * as categoriesRepository from "../repositories/categoriesRepository.js";
import * as disciplinesRepository from "../repositories/disciplinesRepository.js";
import * as teachersRepository from "../repositories/teachersRepository.js";
import * as testsUtil from "../utils/testsUtil.js";
import * as teachersDisciplinesRepository from "../repositories/teachersDisciplinesRepository.js";
export function create(name, pdfUrl, category, discipline, teacher) {
    return __awaiter(this, void 0, void 0, function () {
        var existingCategory, existingDiscipline, existingTeacher, teacherDiscipline;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, categoriesRepository.getByName(category)];
                case 1:
                    existingCategory = _a.sent();
                    if (!existingCategory)
                        throw { type: "error_not_found", message: "Category doesnt exist." };
                    return [4 /*yield*/, disciplinesRepository.getByName(discipline)];
                case 2:
                    existingDiscipline = _a.sent();
                    if (!existingDiscipline)
                        throw { type: "error_not_found", message: "Discipline doesnt exist." };
                    return [4 /*yield*/, teachersRepository.getByName(teacher)];
                case 3:
                    existingTeacher = _a.sent();
                    if (!existingTeacher)
                        throw { type: "error_not_found", message: "Teacher doesnt exist." };
                    return [4 /*yield*/, teachersDisciplinesRepository.getByDisciplineAndTeacherIds(existingDiscipline.id, existingTeacher.id)];
                case 4:
                    teacherDiscipline = _a.sent();
                    if (!teacherDiscipline)
                        throw { type: "error_conflict", message: "Teacher doesnt teach discipline." };
                    return [4 /*yield*/, testsRepository.create(name, pdfUrl, existingCategory.id, teacherDiscipline.id)];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function getByDiscipline() {
    return __awaiter(this, void 0, void 0, function () {
        var tests, testsByCategory, testsByDiscipline, testsByTerm, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testsRepository.getAll()];
                case 1:
                    tests = _a.sent();
                    testsByCategory = testsUtil.groupByCollumnType(tests, "categories");
                    testsByDiscipline = testsUtil.groupByCollumnType(tests, "disciplines");
                    testsByTerm = testsUtil.groupByCollumnType(tests, "terms");
                    response = {
                        terms: testsByTerm.map(function (term) {
                            return {
                                number: term.number,
                                disciplines: testsByDiscipline.filter(function (discipline) {
                                    var aux = term.tests.find(function (termTests) { return termTests.disciplineName === discipline.name; });
                                    return !(aux === undefined);
                                }).map(function (discipline) {
                                    return {
                                        name: discipline.name,
                                        categories: testsByCategory.filter(function (category) {
                                            var aux = discipline.tests.find(function (disciplineTests) { return disciplineTests.categoryName === category.name; });
                                            return !(aux === undefined);
                                        }).map(function (category) {
                                            return {
                                                name: category.name,
                                                tests: category.tests.map(function (test) {
                                                    return {
                                                        id: test.id,
                                                        name: test.name,
                                                        teacher: test.teacherName
                                                    };
                                                })
                                            };
                                        })
                                    };
                                })
                            };
                        })
                    };
                    return [2 /*return*/, response];
            }
        });
    });
}
export function getByTeacher() {
    return __awaiter(this, void 0, void 0, function () {
        var tests, testsByCategory, testsByTeacher, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testsRepository.getAll()];
                case 1:
                    tests = _a.sent();
                    testsByCategory = testsUtil.groupByCollumnType(tests, "categories");
                    testsByTeacher = testsUtil.groupByCollumnType(tests, "teachers");
                    response = {
                        teachers: testsByTeacher.map(function (teacher) {
                            return {
                                name: teacher.name,
                                categories: testsByCategory.filter(function (category) {
                                    var aux = teacher.tests.find(function (teacherTests) { return teacherTests.categoryName === category.name; });
                                    return !(aux === undefined);
                                }).map(function (category) {
                                    return {
                                        name: category.name,
                                        tests: category.tests.map(function (test) {
                                            return {
                                                id: test.id,
                                                name: test.name,
                                                discipline: test.disciplineName
                                            };
                                        })
                                    };
                                })
                            };
                        })
                    };
                    return [2 /*return*/, response];
            }
        });
    });
}
