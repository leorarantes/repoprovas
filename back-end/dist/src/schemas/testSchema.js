import joi from "joi";
var testSchema = joi.object({
    name: joi.string().required(),
    pdfUrl: joi.string().uri(),
    category: joi.string().required(),
    discipline: joi.string().required(),
    teacher: joi.string().required()
});
export default testSchema;
