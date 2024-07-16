import { Pool } from "pg";
import PgAdapter from "./adapter";
import { Tag } from "../models/tag";
export default class TagRepository extends PgAdapter<Tag> {
  constructor(pool: Pool) {
    super(pool, "tags");
  }
}
