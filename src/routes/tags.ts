import { Router } from "express";
import { Repository } from "../types/dbAdapter";
import { Tag } from "../models/tag";

function setup(router: Router, repo: Repository<Tag>): Router {
  router.get("/", async (_req, res) => {
    const tags = await repo.all();
    res.send({ tags });
  });

  router.get("/:id", async (req, res) => {
    const tags = await repo.read(parseInt(req.params.id));
    res.send({ tags });
  });

  router.post("/", async (req, res) => {
    const tags = await repo.create(req.body);
    res.send({ tags });
  });

  router.patch("/:id", async (req, res) => {
    const tags = await repo.update(parseInt(req.params.id), req.body);
    res.send({ tags });
  });

  router.delete("/:id", async (req, res) => {
    const tags = await repo.delete(parseInt(req.params.id));
    res.send({ tags });
  });

  return router;
}

export default setup;
