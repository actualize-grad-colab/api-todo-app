import express from "express";
import cors from "cors";
import * as data from "./models/data";
import todoSetup from "./routes/todos";
const port = 3300;

const app = express();

// TODO: Wrap in env check
const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(express.json());
app.use(cors(options));

const BASEPATH = "/api/v1";

app.use(`${BASEPATH}/todos`, todoSetup(data));

app.listen(port, () => {
  console.log(`ToDo API Running on port ${port}`);
});
