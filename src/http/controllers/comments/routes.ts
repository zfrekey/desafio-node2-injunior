import { FastifyInstance } from "fastify";
import { create } from "./create";
import { deleteComment } from "./delete";



export async function commentRoutes(app: FastifyInstance) {


    app.post("/comments", create)
    app.delete("/comments/:commentId", deleteComment)



}