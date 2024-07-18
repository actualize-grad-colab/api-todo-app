var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
function setup(repo) {
    const router = Router();
    router.get("/", (_req, res) => {
        void (() => __awaiter(this, void 0, void 0, function* () {
            const todos = yield repo.all();
            res.send({ todos });
        }))();
    });
    router.get("/:id", (req, res) => {
        void (() => __awaiter(this, void 0, void 0, function* () {
            const todos = yield repo.read(parseInt(req.params.id));
            res.send({ todos });
        }))();
    });
    router.post("/", (req, res) => {
        void (() => __awaiter(this, void 0, void 0, function* () {
            // FIXME:  Hardcoded user_id
            const body = req.body;
            const todos = yield repo.create(Object.assign(Object.assign({}, body), { user_id: 1 }));
            res.send({ todos });
        }))();
    });
    router.patch("/:id", (req, res) => {
        void (() => __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const todos = yield repo.update(parseInt(req.params.id), body);
            res.send({ todos });
        }))();
    });
    router.delete("/:id", (req, res) => {
        void (() => __awaiter(this, void 0, void 0, function* () {
            const todos = yield repo.delete(parseInt(req.params.id));
            res.send({ todos });
        }))();
    });
    return router;
}
export default setup;
