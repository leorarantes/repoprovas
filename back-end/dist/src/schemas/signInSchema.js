import joi from "joi";
var signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});
export default signInSchema;
