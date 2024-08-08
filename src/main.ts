import express from "express";
import cors from "cors";
import pg from "pg";
import createError from "http-errors";
import errorHandler from "error-handler-json";

import { todoRepository } from "./repository/todoRepository";
import { tagRepository } from "./repository/tagRepository";
import setupTodosController from "./routes/todos";
import setupTagsController from "./routes/tags";
import { QueryConfig } from "squid/pg";
const port = "3300";
const app = express();
const allowedOrigins: string[] = [];

const environment = process.env.NODE_ENV ?? "development";
const isDevEnvironment = environment == "development";

if (isDevEnvironment) {
  allowedOrigins.push("http://localhost:3000");
}

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(express.json());
app.use(cors(options));

// Routes
const BASEPATH = "/api/v1";

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

const query = async (config: QueryConfig): Promise<pg.QueryResult> => {
  if (isDevEnvironment) console.log("Query:", JSON.stringify(config, null, 2));
  return await pool.query(config);
};

app.use(`${BASEPATH}/todos`, setupTodosController(todoRepository(query)));
app.use(`${BASEPATH}/tags`, setupTagsController(tagRepository(query)));

// catch 404 and forward to error handler
// Serves as the last "route option"
app.use((_req, _res, next) => {
  next(createError(404));
});

app.use(errorHandler({ includeStack: isDevEnvironment }));

app.listen(port, () => {
  console.log(`ToDo API Running on port ${port}`);
});
