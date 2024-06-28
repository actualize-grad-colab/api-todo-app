import express from "express";
import cors from "cors";
import * as data from "./models/data";
import { Request, Response } from "express";
const app = express();
const port = 3300;

const BASE = `/api/v1`;

app.get("/", (_req: Request, res: Response) => {
  res.send("We did it again");
});
app.get("${BASE}/todos", async (req, res, next) => {
  const result = await data.gettodo();
  res.send(result.rows[0]);
});

app.listen(port, () => {
  console.log(`ToDo API Running on port ${port}`);
});
