import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { ResourceNotFoundError } from "@/use-cases/errors/resourceNotFound"
import { PrismaLikesRepository } from "@/repositories/prisma/prismaLikesRepository"
import { DeleteLikeUseCase } from "@/use-cases/deleteLikeUseCase"


export async function deleteLike(request: FastifyRequest, reply: FastifyReply) {
    
    const deleteBodySchema = z.object({
        likeId : z.string().uuid(),
    })

    const {likeId: likeId} = deleteBodySchema.parse(request.params)

    try {
        const prismaLikesRepository = new PrismaLikesRepository()
        const deleteLikeUseCase = new DeleteLikeUseCase(prismaLikesRepository)
        const like = await deleteLikeUseCase.execute({
            likeId: likeId
        })

        return reply.status(200).send({ like })

    } catch (err) {
        if(err instanceof ResourceNotFoundError){
            return reply.status(404).send({ message: "Like não encontrado" })
        }
    
    }

}