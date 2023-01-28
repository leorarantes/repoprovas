import joi from "joi";
var oAuthCodeSchema = joi.object({
    code: joi.string().required()
});
export default oAuthCodeSchema;
