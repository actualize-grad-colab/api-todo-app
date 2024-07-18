import PgAdapter, { QueryFunction } from "./adapter";
import { Tag } from "../models/tag";
export default class TagRepository extends PgAdapter<Tag> {
  constructor(query: QueryFunction) {
    super(query, "tags");
  }
}
