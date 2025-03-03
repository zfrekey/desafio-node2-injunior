import { FastifyInstance } from "fastify";
import { createForPost } from "./createForPost";
import { deleteLike } from "./delete";
import { list } from "./list";
import { getById } from "./get";
import { listByPost } from "./listByPost";
import { listByUser } from "./listByUser";
import { createForComment } from "./createForComment";
import { verifyJwt } from "@/http/middleware/verifyJwt";


export async function likeRoutes(app: FastifyInstance) {

    app.post("/likesForPost", {onRequest: [verifyJwt]}, createForPost)
    app.post("/likesForComment",{onRequest: [verifyJwt]}, createForComment)

    app.get("/likes/:likeId", getById)
    app.get("/likes", list)
    app.get("/likes/posts/:postId", listByPost)
    app.get("/likes/users/:userId", listByUser)

    app.delete("/likes/:likeId", {onRequest: [verifyJwt]}, deleteLike)
}