import { FastifyInstance } from "fastify";
import { create } from "./create";
import { deleteLike } from "./delete";
import { list } from "./list";
import { getById } from "./get";
import { listByPost } from "./listByPost";
import { listByUser } from "./listByUser";


export async function likeRoutes(app: FastifyInstance) {

    app.post("/likes", create)

    app.get("/likes/:likeId", getById)
    app.get("/likes", list)
    app.get("/likes/posts/:postId", listByPost)
    app.get("/likes/users/:userId", listByUser)

    app.delete("/likes/:likeId", deleteLike)
}