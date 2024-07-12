import { Router } from "express";
import { Repository } from "../types/dbAdapter";
import { Todo } from "../models/todo";

function setup(router: Router, repo: Repository<Todo>) {
  router.get("/", async (_req, res, _next) => {
    const todos = await repo.all();
    res.send({ todos });
  });

  router.get("/:id", async (req, res, _next) => {
    const todos = await repo.read(parseInt(req.params.id));
    res.send({ todos });
  });

  router.post("/", async (req, res, _next) => {
    const todos = await repo.create(req.body);
    res.send({ todos });
  });

  router.patch("/:id", async (req, res, _next) => {
    const todos = await repo.update(parseInt(req.params.id), req.body);
    res.send({ todos });
  });

  router.delete("/:id", async (req, res, _next) => {
    const todos = await repo.delete(parseInt(req.params.id));
    res.send({ todos });
  });

  return router;
}

export default setup;
