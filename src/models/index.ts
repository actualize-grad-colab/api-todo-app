import pg from "pg";
const { Pool } = pg;

const pool = new Pool();

/*
 * We wrap and export pool.query to allow for easier testing.
 * This way we can eventually pass in a fake version of pool for testing.
 * Don't worry if it doesn't make sene yet.
 */
export const query = (
  text: string,
  params: any,
  callback: (err: Error, result: pg.QueryResult<any>) => void,
) => {
  return pool.query(text, params, callback);
};
