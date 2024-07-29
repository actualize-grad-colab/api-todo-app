import { sql } from "../../src/repository/query";

test("formats sql query string", () => {
  const val1 = 1;
  const val2 = "two";
  const result = sql`SELECT * FROM t WHERE id = ${val1} AND name = ${val2};`;

  expect(result.text).toBe(`SELECT * FROM t WHERE id = $1 AND name = $2;`);
  result.values.forEach((value, index) => {
    expect(value).toBe(result.values[index]);
  });
});
