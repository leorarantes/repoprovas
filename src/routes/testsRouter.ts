import {Router} from "express";

import { create, getByDiscipline, getByTeacher } from "../controllers/testsController.js";
import validateSchema from "../middlewares/validateSchema.js";
import validateToken from "../middlewares/authValidator.js";
import testSchema from "../schemas/testSchema.js";

const testsRouter = Router();

testsRouter.post('/tests', validateSchema(testSchema), validateToken, create);
testsRouter.get('/tests/terms', validateToken, getByDiscipline);
testsRouter.get('/tests/teachers', validateToken, getByTeacher);

export default testsRouter;