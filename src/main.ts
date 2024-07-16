import express from "express";
import cors from "cors";
import todoRepo from "./repository/todoRepo";
import tagRepo from "./repository/tagRepo";
import todoSetup from "./routes/todos";
import tagSetup from "./routes/tags";
const port = 3300;

const app = express();

const allowedOrigins: string[] = [];
if (process.env.NODE_ENV == "development") {
  allowedOrigins.push("http://localhost:3000");
}

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(express.json());
app.use(cors(options));

const BASEPATH = "/api/v1";

app.use(`${BASEPATH}/todos`, todoSetup(todoRepo));
app.use(`${BASEPATH}/tags`, tagSetup(tagRepo));
// TODO: Add more routes here

app.listen(port, () => {
  console.log(`ToDo API Running on port ${port}`);
});
