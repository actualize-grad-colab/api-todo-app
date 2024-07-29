/**
 * This function is used to create a SQL query string
 *
 *
 *
 */
import { QueryConfig, QueryResult } from "pg";

export function sql(
  strings: TemplateStringsArray,
  ...values: (string | number)[]
): QueryConfig {
  if (strings.length != values.length + 1) {
    throw new Error("Invalid query");
  }
  return {
    values,
    text: strings.reduce((acc, str, i) => {
      if (i > 0) {
        return `${acc}$${i.toString()}${str}`;
      }
      return `${acc}${str}`;
    }),
  };
}
