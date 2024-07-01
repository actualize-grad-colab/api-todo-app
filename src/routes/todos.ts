import express from "express";
const router = express.Router();

function setup(data: any) {
  router.get("/", async (req, res, next) => {
    const result = await data.getTodo();
    res.send({ todos: result.rows });
  });

  router.post("/", async (req, res, next) => {
    console.log("req.*=>", req.body);
    const result = await data.createTodo(req.body);
    res.send(result);
  });
  return router;
}

export default setup;
