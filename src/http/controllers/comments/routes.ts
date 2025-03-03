import { FastifyInstance } from "fastify";
import { create } from "./create";
import { deleteComment } from "./delete";
import { list } from "./list";
import { listByUser } from "./listByUser";
import { listByPost } from "./listByPost";
import { getById } from "./get";
import { update } from "./update";
import { verifyJwt } from "@/http/middleware/verifyJwt";



export async function commentRoutes(app: FastifyInstance) {

    app.post("/comments", {onRequest: [verifyJwt]}, create)
    app.get("/comments/:commentId", getById)
    app.get("/comments", list)
    app.get("/comments/users/:userId", listByUser)
    app.get("/comments/posts/:postId", listByPost)
    app.patch("/comments/:commentId", {onRequest: [verifyJwt]}, update)
    app.delete("/comments/:commentId", {onRequest: [verifyJwt]},deleteComment)
}