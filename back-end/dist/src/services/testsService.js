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
import * as termsRepository from "../repositories/termsRepository.js";
import * as teachersDisciplinesRepository from "../repositories/teachersDisciplinesRepository.js";
export function create(teacher, discipline, category, pdfUrl, name) {
    return __awaiter(this, void 0, void 0, function () {
        var existingTeacher, existingDiscipline, teacherDiscipline, existingCategory;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, teachersRepository.getByName(teacher)];
                case 1:
                    existingTeacher = _a.sent();
                    if (!existingTeacher)
                        throw { type: "error_not_found", message: "Teacher doesnt exist." };
                    return [4 /*yield*/, disciplinesRepository.getByName(discipline)];
                case 2:
                    existingDiscipline = _a.sent();
                    if (!existingDiscipline)
                        throw { type: "error_not_found", message: "Discipline doesnt exist." };
                    return [4 /*yield*/, teachersDisciplinesRepository.getByDisciplineAndTeacherIds(existingDiscipline.id, existingTeacher.id)];
                case 3:
                    teacherDiscipline = _a.sent();
                    if (!teacherDiscipline)
                        throw { type: "error_conflict", message: "Teacher doesnt teach discipline." };
                    return [4 /*yield*/, categoriesRepository.getByName(category)];
                case 4:
                    existingCategory = _a.sent();
                    if (!existingCategory)
                        throw { type: "error_not_found", message: "Category doesnt exist." };
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
        var testsByDiscipline, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, termsRepository.getTestsByTerm()];
                case 1:
                    testsByDiscipline = _a.sent();
                    response = testsByDiscipline.map(function (term) {
                        return {
                            id: term.id,
                            number: term.number,
                            disciplines: term.disciplines.map(function (discipline) {
                                return {
                                    id: discipline.id,
                                    name: discipline.name,
                                    teacherDisciplines: discipline.teachersDisciplines.map(function (teacherDiscipline) {
                                        return {
                                            id: teacherDiscipline.id,
                                            discipline: {
                                                id: teacherDiscipline.disciplines.id,
                                                name: teacherDiscipline.disciplines.name,
                                                term: teacherDiscipline.disciplines.terms
                                            },
                                            teacher: teacherDiscipline.teachers,
                                            tests: teacherDiscipline.tests.map(function (test) {
                                                return {
                                                    id: test.id,
                                                    name: test.name,
                                                    pdfUrl: test.pdfUrl,
                                                    category: test.categories
                                                };
                                            })
                                        };
                                    }),
                                    term: discipline.terms
                                };
                            })
                        };
                    });
                    return [2 /*return*/, response];
            }
        });
    });
}
export function getByTeacher() {
    return __awaiter(this, void 0, void 0, function () {
        var testsByTeacher, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, teachersDisciplinesRepository.getTestsByTeacher()];
                case 1:
                    testsByTeacher = _a.sent();
                    response = testsByTeacher.map(function (teachersDisciplines) {
                        return {
                            id: teachersDisciplines.id,
                            discipline: teachersDisciplines.disciplines,
                            teacher: {
                                id: teachersDisciplines.teachers.id,
                                name: teachersDisciplines.teachers.name
                            },
                            tests: teachersDisciplines.tests,
                            disciplines: teachersDisciplines.teachers.teachersDisciplines.map(function (element) {
                                return {
                                    id: element.disciplines.id,
                                    name: element.disciplines.name,
                                    term: element.disciplines.terms
                                };
                            })
                        };
                    });
                    return [2 /*return*/, response];
            }
        });
    });
}
