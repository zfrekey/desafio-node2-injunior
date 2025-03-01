import { FastifyInstance } from "fastify";
import { create } from "./create";


export async function likeRoutes(app: FastifyInstance) {
    app.post("/likes", create)

}