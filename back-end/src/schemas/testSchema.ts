import joi from "joi";

const testSchema = joi.object({
    teacher: joi.string().required(),
    discipline: joi.string().required(),
    category: joi.string().required(),
    pdfUrl: joi.string().uri(),
    name: joi.string().required()
});

export default testSchema;