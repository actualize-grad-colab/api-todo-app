import { query } from "./connection"
type Todo = { title: string; body: string; user_id: number };

export async function gettodo () { 
  const result = await query('select * from todos;', [])
    return result}
    