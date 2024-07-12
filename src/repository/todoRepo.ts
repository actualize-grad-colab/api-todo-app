import { pgAdapter } from "./adapter";
import { Todo } from "../models/todo";
export default pgAdapter<Todo>("todos");
