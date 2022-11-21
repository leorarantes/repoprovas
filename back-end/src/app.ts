import express from "express";
import "express-async-errors";

import errorHandler from "./middlewares/errorHandler.js";
import router from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(router);
app.use(errorHandler);

export default app;