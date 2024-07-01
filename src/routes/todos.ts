import express from "express";
const router = express.Router();

function setup(data) {
  router.get("/", async (req, res, next) => {
    const result = await data.getTodo();
    res.send({ todos: result.rows });
  });

  router.post("/", async(req, res, next) => {
  const result = await data.createTodo
  }
  return router;
}

export default setup;
