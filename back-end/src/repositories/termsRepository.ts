import { idText } from "typescript";
import prisma from "../database.js";

export async function getTestsByTerm() {
    const terms = await prisma.terms.findMany({
        select: {
            id: true,
            number: true,
            disciplines: {
                select: {
                    id: true,
                    name: true,
                    teachersDisciplines: {
                        select: {
                            id: true,
                            disciplines: {
                                select: {
                                    id: true,
                                    name: true,
                                    terms: true
                                }
                            },
                            teachers: true,
                            tests: {
                                select: {
                                    id: true,
                                    name: true,
                                    pdfUrl: true,
                                    categories: true
                                }
                            }
                        }
                    },
                    terms: true
                }
            }
        }
    });
    return terms;
}