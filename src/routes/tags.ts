import { Router, Request, Response } from "express";
import { Repository } from "../types/dbAdapter";
import { Tag } from "../models/tag";
import { AtLeast } from "../types/util";

function setup(repo: Repository<Tag>): Router {
  const router = Router();

  router.get("/", (_req: Request, res: Response): void => {
    void (async (): Promise<void> => {
      const tags = await repo.all();
      res.send({ tags });
    })();
  });

  router.get("/:id", (req: Request, res: Response): void => {
    void (async (): Promise<void> => {
      const tags = await repo.read(parseInt(req.params.id));
      res.send({ tags });
    })();
  });

  router.post("/", (req: Request, res: Response): void => {
    void (async (): Promise<void> => {
      const body = req.body as AtLeast<Tag, "label">;
      // FIXME:  Hardcoded user_id
      const tags = await repo.create({ ...body, user_id: 1 });
      res.status(201).send({ tags });
    })();
  });

  router.patch("/:id", (req: Request, res: Response): void => {
    void (async (): Promise<void> => {
      const body = req.body as Partial<Tag>;
      const tags = await repo.update(parseInt(req.params.id), body);
      res.send({ tags });
    })();
  });

  router.delete("/:id", (req: Request, res: Response): void => {
    void (async (): Promise<void> => {
      const tags = await repo.delete(parseInt(req.params.id));
      res.status(204).send({ tags });
    })();
  });

  return router;
}

export default setup;
