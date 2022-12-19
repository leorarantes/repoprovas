import {Router} from "express";
import { get } from "../controllers/categoriesController.js";

const categoriesRouter = Router();

categoriesRouter.get('/categories', get);

export default categoriesRouter;