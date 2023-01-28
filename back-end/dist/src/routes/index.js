import { Router } from "express";
import authRouter from "./authRouter.js";
import categoriesRouter from "./categoriesRouter.js";
import testsRouter from "./testsRouter.js";
var router = Router();
router.use(authRouter);
router.use(testsRouter);
router.use(categoriesRouter);
export default router;
