import pg from "pg";
const { Pool } = pg;

const pool = new Pool();

/*
 * We wrap and export pool.query to allow for easier testing.
 * This way we can eventually pass in a fake version of pool for testing.
 * Don't worry if it doesn't make sene yet.
 */
export const query = async (text: string, params: any) => {
  return await pool.query(text, params);
};
