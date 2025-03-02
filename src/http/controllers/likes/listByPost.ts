import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "@/use-cases/errors/resourceNotFound"
import { z } from "zod"
import { PrismaLikesRepository } from "@/repositories/prisma/prismaLikesRepository"
import { ListLikeByPostIdUseCase } from "@/use-cases/listLikeByPostUseCase"


export async function listByPost(request: FastifyRequest, reply: FastifyReply) {

    const getBodySchema = z.object({
            postId : z.string().uuid(),
        })
    
    const {postId} = getBodySchema.parse(request.params)

    try {
        const prismaLikeRepository = new PrismaLikesRepository()
        const listLikesByIdUseCase = new ListLikeByPostIdUseCase(prismaLikeRepository)
        const like = await listLikesByIdUseCase.execute({postId})

        return reply.status(200).send({ like })
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: "Like não encontrado" })
        }
    }
}