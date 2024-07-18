var _a;
import express from "express";
import cors from "cors";
import { Pool } from "pg";
import createError from "http-errors";
import errorHandler from "error-handler-json";
import TodoRepo from "./repository/todoRepo";
import TagRepo from "./repository/tagRepo";
import setupTodosController from "./routes/todos";
import setupTagsController from "./routes/tags";
const port = "3300";
const app = express();
const allowedOrigins = [];
const environment = (_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : "development";
const isDevEnvironment = environment == "development";
if (isDevEnvironment) {
    allowedOrigins.push("http://localhost:3000");
}
const options = {
    origin: allowedOrigins,
};
app.use(express.json());
app.use(cors(options));
// Routes
const BASEPATH = "/api/v1";
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
app.use(`${BASEPATH}/todos`, setupTodosController(new TodoRepo(pool)));
app.use(`${BASEPATH}/tags`, setupTagsController(new TagRepo(pool)));
// catch 404 and forward to error handler
// Serves as the last "route option"
app.use((_req, _res, next) => {
    next(createError(404));
});
app.use(errorHandler({ includeStack: isDevEnvironment }));
app.listen(port, () => {
    console.log(`ToDo API Running on port ${port}`);
});
// TODO: Add error handling
// TODO: Fix hard-coded user_ids
// TODO: Unify response object structure
