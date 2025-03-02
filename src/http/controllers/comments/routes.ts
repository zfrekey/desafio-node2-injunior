import { FastifyInstance } from "fastify";
import { create } from "./create";
import { deleteComment } from "./delete";
import { list } from "./list";
import { listByUser } from "./listByUser";
import { listByPost } from "./listByPost";
import { getById } from "./get";



export async function commentRoutes(app: FastifyInstance) {

    app.post("/comments", create)
    app.delete("/comments/:commentId", deleteComment)
    app.get("/comments/:commentId", getById)
    app.get("/comments", list)
    app.get("/comments/users/:userId", listByUser)
    app.get("/comments/posts/:postId", listByPost)
}