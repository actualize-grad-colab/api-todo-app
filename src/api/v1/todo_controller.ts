import { Request, Response } from 'express';

export default function (app: any): void {
  app.get('/api/v1/todos', (_req: Request, res: Response) => {
    res.send(JSON.stringify({}));
  });
}
