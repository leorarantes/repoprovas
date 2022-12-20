import joi from "joi";

const oAuthCodeSchema = joi.object({
    code: joi.string().required()
});

export default oAuthCodeSchema;