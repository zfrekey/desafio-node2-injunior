import { FastifyInstance } from "fastify";
import { create } from "./create";
import { deleteComment } from "./delete";
import { list } from "./list";



export async function commentRoutes(app: FastifyInstance) {


    app.post("/comments", create)
    app.delete("/comments/:commentId", deleteComment)
    app.get("/comments", list)


}