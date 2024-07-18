import PgAdapter from "./adapter";
export default class TagRepository extends PgAdapter {
    constructor(pool) {
        super(pool, "tags");
    }
}
