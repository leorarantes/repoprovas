import { Router } from "express";
import authRouter from "./authRouter.js";
import testsRouter from "./testsRouter.js";
var router = Router();
router.use(authRouter);
router.use(testsRouter);
export default router;
