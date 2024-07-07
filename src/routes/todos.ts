import express from "express";
const router = express.Router();

/* Thinking this is going to look like:
 * main = setup the app
 * |
 * V
 * routes/resource = handle the http requests and responses
 * |               ^
 * V               |
 * models/entitiy = expose "ORM" like methods and return model objects
 * |               ^
 * V               |
 * data/records = accept a db connection interface and run SQL querries
 *
 */
function setup(todoData: any) {
  router.get("/", async (req, res, next) => {
    const todos = await todoData.all();
    res.send({ todos });
  });

  router.get("/:id", async (req, res, next) => {
    const todos = await todoData.getById(req.params.id);
    res.send({ todos });
  });

  router.post("/", async (req, res, next) => {
    const todos = await todoData.create(req.body);
    res.send({ todos });
  });

  router.put("/", async (req, res, next) => {
    const todos = await todoData.update(req.body);
    res.send({ todos });
  });

  router.delete("/:id", async (req, res, next) => {
    const todos = await todoData.destroy(req.params.id);
    res.send({ todos });
  });

  return router;
}

export default setup;
