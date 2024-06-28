import express from "express";
import cors from "cors";
import * as data from "./models/data";
const port = 3300;

const app = express();

const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));

const BASE = "/api/v1";

app.get(`${BASE}/todos`, async (req, res, next) => {
  const result = await data.gettodo();
  res.send({ todos: result.rows });
});

app.listen(port, () => {
  console.log(`ToDo API Running on port ${port}`);
});
