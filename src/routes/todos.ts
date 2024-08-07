import { Router, Request, Response } from "express";
import { Repository } from "../repository/iRepository";
import { TodosTable } from "../models/todo";
import { NewTableRow, TableRow } from "squid";

function setup(repo: Repository<TodosTable>): Router {
  const router = Router();

  router.get("/", (_req: Request, res: Response): void => {
    void (async (): Promise<void> => {
      const todos = await repo.all();
      res.send({ data: { todos } });
    })();
  });

  router.get("/:id", (req: Request, res: Response): void => {
    void (async (): Promise<void> => {
      const todos = await repo.read(parseInt(req.params.id));
      res.send({ data: { todos } });
    })();
  });

  router.post("/", (req: Request, res: Response): void => {
    void (async (): Promise<void> => {
      // FIXME:  Hardcoded user_id
      const body = req.body as NewTableRow<TodosTable>;
      const todos = await repo.create({ ...body, user_id: 1 });
      // NOTE: something like
      // res.status(201).success("New todo created successfully").data({ todos }).send();
      res.status(201).send({ data: { todos } });
    })();
  });

  router.patch("/:id", (req: Request, res: Response): void => {
    void (async (): Promise<void> => {
      const body = req.body as Partial<TableRow<TodosTable>>;
      const todos = await repo.update(parseInt(req.params.id), body);
      res.send({ data: { todos } });
    })();
  });

  router.delete("/:id", (req: Request, res: Response): void => {
    void (async (): Promise<void> => {
      const todos = await repo.remove(parseInt(req.params.id));
      res.status(204).send({ todos });
    })();
  });

  return router;
}

export default setup;
