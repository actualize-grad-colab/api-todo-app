import { Router, Request, Response } from "express";
import { Repository } from "../repository/iRepository";
import { TagsTable } from "../models/tag";
import { TableRow, NewTableRow } from "squid";

function setup(repo: Repository<TagsTable>): Router {
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
      const body = req.body as NewTableRow<TagsTable>;
      // FIXME:  Hardcoded user_id
      const tags = await repo.create({ ...body, user_id: 1 });
      res.status(201).send({ tags });
    })();
  });

  router.patch("/:id", (req: Request, res: Response): void => {
    void (async (): Promise<void> => {
      const body = req.body as Partial<TableRow<TagsTable>>;
      const tags = await repo.update(parseInt(req.params.id), body);
      res.send({ tags });
    })();
  });

  router.delete("/:id", (req: Request, res: Response): void => {
    void (async (): Promise<void> => {
      const tags = await repo.remove(parseInt(req.params.id));
      res.status(204).send({ tags });
    })();
  });

  return router;
}

export default setup;
