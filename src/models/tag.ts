// NOTE: Not sure where it should go, but tags should be case insensitive
// or maybe case preserving and insensitivefor the label
interface TagRecord {
  tag_id: number;
  label: string;
  user_id: number;
}
export class Tag {
  static #isInternalConstructing = false;

  id: number;
  label: string;
  user_id: number;

  constructor({ tag_id, label, user_id }: TagRecord) {
    if (!Tag.#isInternalConstructing) {
      throw new TypeError("Todo is not externally constructable");
    }
    Tag.#isInternalConstructing = false;
    this.id = tag_id;
    this.label = label;
    this.user_id = user_id;
  }
}
