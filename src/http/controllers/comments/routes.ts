import { FastifyInstance } from "fastify";
import { create } from "./create";



export async function commentRoutes(app: FastifyInstance) {


    app.post("/comments", create)



}