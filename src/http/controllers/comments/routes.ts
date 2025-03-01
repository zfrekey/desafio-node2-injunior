import { FastifyInstance } from "fastify";
import { create } from "./create";
import { deleteComment } from "./delete";
import { list } from "./list";
import { listByUser } from "./listByUser";



export async function commentRoutes(app: FastifyInstance) {

    app.post("/comments", create)
    app.delete("/comments/:commentId", deleteComment)
    app.get("/comments", list)
    app.get("/comments/users/:userId", listByUser)
}