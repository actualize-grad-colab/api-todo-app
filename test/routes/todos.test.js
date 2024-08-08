import express from "express";
import request from "supertest";
import { BASEPATH } from "../helpers";

// import { todoRepository } from "./repository/todoRepository";
// import { tagRepository } from "./repository/tagRepository";
import setupTodosController from "../../src/routes/todos";
// import setupTagsController from "./routes/tags";

// all, read, create, update, remove
describe("routes/todos", () => {
  const todo1 = {
    id: 1,
    title: "Test",
    body: "Test body.",
    status: "pending",
    userId: 1,
  };
  const todo2 = {
    id: 2,
    title: "Test 2",
    body: "Test body 2.",
    status: "pending",
    userId: 1,
  };
  const app = express();
  const all = jest.fn(async () => {
    return await Promise.resolve([todo1, todo2]);
  });
  app.use(`${BASEPATH}/todos`, setupTodosController({ all }));
  test("GET /todos returns all todos for user", async () => {
    const response = await request(app).get(`${BASEPATH}/todos`);
    expect(response.status).toBe(200);
    expect(response.body.data).toStrictEqual({ todos: [todo1, todo2] });
  });
});
