import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "@/use-cases/errors/resourceNotFound"
import { z } from "zod"
import { PrismaLikesRepository } from "@/repositories/prisma/prismaLikesRepository"
import { ListLikeByUserIdUseCase } from "@/use-cases/listLikeByUserUseCase"

export async function listByUser(request: FastifyRequest, reply: FastifyReply) {

    const getBodySchema = z.object({
            userId : z.string().uuid(),
        })
    
    const {userId} = getBodySchema.parse(request.params)

    try {
        const prismaLikeRepository = new PrismaLikesRepository()
        const listLikesByIdUseCase = new ListLikeByUserIdUseCase(prismaLikeRepository)
        const like = await listLikesByIdUseCase.execute({userId})

        return reply.status(200).send({ like })
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: "Like não encontrado" })
        }
    }
}