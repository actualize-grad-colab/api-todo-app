import { jest } from "@jest/globals";
import { tagRepository } from "../../src/repository/tagRepository";
import { stringNormalize, sql } from "../helpers";

describe("tagRepository", () => {
  test("create", async () => {
    const queryFunction = jest.fn(async () => {
      return await Promise.resolve({
        rows: [{ id: 1 }],
      });
    });
    const repo = tagRepository(queryFunction);
    const result = await repo.create({
      label: "test",
      userId: 1,
    });
    const expectedPgQueryCfg = {
      text: sql`INSERT INTO tags ("label", "userId") VALUES ($1, $2) RETURNING "id"`,
      values: ["test", 1],
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
            label: "test",
            userId: 1,
          },
        ],
      });
    });
    const repo = tagRepository(queryFunction);
    const result = await repo.read(1);
    const expectedPgQueryCfg = {
      text: stringNormalize(sql`SELECT * FROM tags WHERE "id" = $1`),
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
      label: "test",
      userId: 1,
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
    const repo = tagRepository(queryFunction);
    const result = await repo.update(1, {
      label: "TEST",
    });
    const expectedPgQueryCfg = {
      text: stringNormalize(
        sql`UPDATE tags SET "label" = $1 WHERE "id" = $2 RETURNING "id"`,
      ),
      values: ["TEST", 1],
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
    const repo = tagRepository(queryFunction);
    const result = await repo.remove(1);
    const expectedPgQueryCfg = {
      text: sql`DELETE FROM tags WHERE "id" = $1 RETURNING "id"`,
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
            label: "test",
            userId: 1,
          },
        ],
      });
    });
    const repo = tagRepository(queryFunction);
    const result = await repo.all();
    const expectedPgQueryCfg = {
      text: stringNormalize(sql`SELECT * FROM tags`),
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
        label: "test",
        userId: 1,
      },
    ]);
  });
});
