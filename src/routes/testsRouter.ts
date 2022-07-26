import {Router} from "express";

import { create, getByDiscipline, getByTeacher } from "../controllers/testsController.js";
import validateSchema from "../middlewares/validateSchema.js";
import validateToken from "../middlewares/authValidator.js";
import testSchema from "../schemas/testSchema.js";

const testsRouter = Router();

testsRouter.post('/tests', validateSchema(testSchema), validateToken, create);
testsRouter.get('/tests/discipline/:id', validateToken, getByDiscipline);
testsRouter.get('/tests/teacher/:id', validateToken, getByTeacher);

export default testsRouter;