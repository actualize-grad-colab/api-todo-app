import express from "express";
import cors from "cors";
import todoRepo from "./repository/todoRepo";
import todoSetup from "./routes/todos";
const port = 3300;

const app = express();

// TODO: Wrap in env check
const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const router = express.Router();

app.use(express.json());
app.use(cors(options));

const BASEPATH = "/api/v1";

app.use(`${BASEPATH}/todos`, todoSetup(router, todoRepo));

app.listen(port, () => {
  console.log(`ToDo API Running on port ${port}`);
});
