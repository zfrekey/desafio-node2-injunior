import { FastifyInstance } from "fastify";
import { create } from "./create";
import { deleteLike } from "./delete";
import { list } from "./list";


export async function likeRoutes(app: FastifyInstance) {


    app.post("/likes", create)

    app.get("/likes", list)

    app.delete("/likes/:likeId", deleteLike)
}