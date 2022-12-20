import {Router} from "express";

import { signUp, signIn, signInWithGitHub } from "../controllers/authController.js";
import validateSchema from "../middlewares/validateSchema.js";
import signUpSchema from "../schemas/signUpSchema.js";
import signInSchema from "../schemas/signInSchema.js";
import oAuthCodeSchema from "../schemas/oAuthCodeSchema.js";

const authRouter = Router();

authRouter.post('/sign-up', validateSchema(signUpSchema), signUp);
authRouter.post('/sign-in', validateSchema(signInSchema), signIn);
authRouter.post('/sign-in/github', validateSchema(oAuthCodeSchema), signInWithGitHub);

export default authRouter;