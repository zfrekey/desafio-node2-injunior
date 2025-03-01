import { FastifyInstance } from "fastify";
import { create } from "./create";
import { deleteLike } from "./delete";


export async function likeRoutes(app: FastifyInstance) {


    app.post("/likes", create)



    app.delete("/likes/:likeId", deleteLike)
}