import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { ResourceNotFoundError } from "@/use-cases/errors/resourceNotFound"
import { PrismaLikesRepository } from "@/repositories/prisma/prismaLikesRepository"
import { GetLikeUseCase } from "@/use-cases/getLikeUseCase"


export async function getById(request: FastifyRequest, reply: FastifyReply) {
    
    const getBodySchema = z.object({
        likeId : z.string().uuid(),
    })

    const {likeId} = getBodySchema.parse(request.params)

    try {
        const prismaLikeRepository= new PrismaLikesRepository()
        const getLikeUseCase = new GetLikeUseCase(prismaLikeRepository)
        const comment = await getLikeUseCase.execute({
            likeId
        })

        return reply.status(200).send({ comment })

    } catch (err) {
        if(err instanceof ResourceNotFoundError){
            return reply.status(404).send({ message: "Like não encontrado" })
        }
    
    }

}