import { FastifyInstance } from "fastify";
import { create } from "./create";
import { getById } from "./get";
import { update } from "./update";
import { deletePost } from "./delete";
import { list } from "./list";
import { listByUser } from "./listByUser";
import { verifyJwt } from "@/http/middleware/verifyJwt";

export async function postRoutes(app: FastifyInstance) {
    app.post("/posts", {onRequest: [verifyJwt]}, create)

    app.get("/posts/:postId", getById)
    app.get("/posts", list)
    app.get("/posts/users/:userId", listByUser)

    app.patch("/posts/:postId", {onRequest: [verifyJwt]}, update)

    app.delete("/posts/:postId", {onRequest: [verifyJwt]}, deletePost)
}