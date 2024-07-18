var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _a, _Todo_isInternalConstructing;
const TodoStatusValues = {
    canceled: "canceled",
    pending: "pending",
    active: "active",
    complete: "copmplete",
};
export class Todo {
    constructor({ todo_id, title, body, status, user_id }) {
        if (!__classPrivateFieldGet(_a, _a, "f", _Todo_isInternalConstructing)) {
            throw new TypeError("Todo is not externally constructable");
        }
        __classPrivateFieldSet(_a, _a, false, "f", _Todo_isInternalConstructing);
        this.id = todo_id;
        this.title = title;
        this.body = body;
        this.status = status;
        this.user_id = user_id;
    }
}
_a = Todo;
_Todo_isInternalConstructing = { value: false };
