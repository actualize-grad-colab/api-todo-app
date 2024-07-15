import { pgAdapter } from "./adapter";
import { Tag } from "../models/tag";
export default pgAdapter<Tag>("tags");
