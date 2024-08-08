import { jest } from "@jest/globals";
import { todoRepository } from "../../src/repository/todoRepository";
import { stringNormalize, sql } from "../helpers";

describe("todoRepository", () => {
  test("create", async () => {
    const queryFunction = jest.fn(async () => {
      return await Promise.resolve({
        rows: [{ id: 1 }],
      });
    });
    const repo = todoRepository(queryFunction);
    const result = await repo.create({
      title: "Test Title",
      body: "Test body.",
      userId: 1,
    });
    const expectedPgQueryCfg = {
      text: sql`INSERT INTO todos ("title", "body", "userId") VALUES ($1, $2, $3) RETURNING "id"`,
      values: ["Test Title", "Test body.", 1],
    };

    expect(queryFunction).toBeCalledWith(expectedPgQueryCfg);
    expect(result).toStrictEqual({ id: 1 });
  });

  test("read", async () => {
    const queryFunction = jest.fn(async () => {
      return await Promise.resolve({
        rows: [
          {
            id: 1,
            title: "Test Title",
            body: "Test body.",
            userId: 1,
            status: "pending",
            tags: [],
          },
        ],
      });
    });
    const repo = todoRepository(queryFunction);
    const result = await repo.read(1);
    const expectedPgQueryCfg = {
      text: stringNormalize(sql`
           SELECT
               td.id,
               td.title,
               td.body,
               td.status,
               tags.tags AS tags
           FROM todos AS td
           LEFT JOIN (
               SELECT
                   tt.todo_id AS id,
                   array_agg(t.label) AS tags
               FROM todo_tags AS tt
               LEFT JOIN tags AS t ON tt.tag_id = t.id
               GROUP BY tt.todo_id
           ) tags USING (id)
          WHERE td.id = $1`),
      values: [1],
    };
    const queryCfgNorm = queryFunction.mock.calls[0][0];
    const calledWith = {
      text: stringNormalize(queryCfgNorm.text),
      values: queryCfgNorm.values,
    };
    expect(calledWith).toStrictEqual(expectedPgQueryCfg);
    expect(result).toStrictEqual({
      id: 1,
      title: "Test Title",
      body: "Test body.",
      userId: 1,
      status: "pending",
      tags: [],
    });
  });

  test("update", async () => {
    const queryFunction = jest.fn(async () => {
      return await Promise.resolve({
        rows: [
          {
            id: 1,
          },
        ],
      });
    });
    const repo = todoRepository(queryFunction);
    const result = await repo.update(1, {
      body: "Updated body.",
    });
    const expectedPgQueryCfg = {
      text: stringNormalize(
        sql`UPDATE todos SET "body" = $1 WHERE "id" = $2 RETURNING "id"`,
      ),
      values: ["Updated body.", 1],
    };
    const queryCfgNorm = queryFunction.mock.calls[0][0];
    const calledWith = {
      text: stringNormalize(queryCfgNorm.text),
      values: queryCfgNorm.values,
    };
    expect(calledWith).toStrictEqual(expectedPgQueryCfg);
    expect(result).toStrictEqual({ id: 1 });
  });

  test("delete", async () => {
    const queryFunction = jest.fn(async () => {
      return await Promise.resolve({
        rows: [
          {
            id: 1,
          },
        ],
      });
    });
    const repo = todoRepository(queryFunction);
    const result = await repo.remove(1);
    const expectedPgQueryCfg = {
      text: sql`DELETE FROM todos WHERE "id" = $1 RETURNING "id"`,
      values: [1],
    };
    const queryCfgNorm = queryFunction.mock.calls[0][0];
    const calledWith = {
      text: stringNormalize(queryCfgNorm.text),
      values: queryCfgNorm.values,
    };
    expect(calledWith).toStrictEqual(expectedPgQueryCfg);
    expect(result).toStrictEqual({ id: 1 });
  });

  test("all", async () => {
    const queryFunction = jest.fn(async () => {
      return await Promise.resolve({
        rows: [
          {
            id: 1,
            title: "Test Title",
            body: "Test body.",
            userId: 1,
            status: "pending",
          },
        ],
      });
    });
    const repo = todoRepository(queryFunction);
    const result = await repo.all();
    const expectedPgQueryCfg = {
      text: stringNormalize(sql`SELECT * FROM todos`),
      values: [],
    };
    const queryCfgNorm = queryFunction.mock.calls[0][0];
    const calledWith = {
      text: stringNormalize(queryCfgNorm.text),
      values: queryCfgNorm.values,
    };
    expect(calledWith).toStrictEqual(expectedPgQueryCfg);
    expect(result).toStrictEqual([
      {
        id: 1,
        title: "Test Title",
        body: "Test body.",
        userId: 1,
        status: "pending",
      },
    ]);
  });

  test("setTags", async () => {
    const queryFunction = jest.fn(async () => {
      return await Promise.resolve({
        rows: [
          {
            id: 1,
          },
        ],
      });
    });
    const repo = todoRepository(queryFunction);

    const result = await repo.setTags(1, [1, 2, 3]);

    const expectedPgQueryCfg = {
      text: stringNormalize(sql`
        INSERT INTO todo_tags (todo_id, tag_id)
          SELECT $1, unnest($2::int[])
          ON CONFLICT (todo_id, tag_id) DO NOTHING
        `),
      values: [1, [1, 2, 3]],
    };

    const queryCfgNorm = queryFunction.mock.calls[0][0];
    const calledWith = {
      text: stringNormalize(queryCfgNorm.text),
      values: queryCfgNorm.values,
    };

    expect(calledWith).toStrictEqual(expectedPgQueryCfg);
    expect(result).toStrictEqual({ id: 1 });
  });
});
