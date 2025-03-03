import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "@/use-cases/errors/resourceNotFound"
import { z } from "zod"
import { PrismaLikesRepository } from "@/repositories/prisma/prismaLikesRepository"
import { ListLikeByCommentIdUseCase } from "@/use-cases/listLikeByCommentUseCase"


export async function listByComment(request: FastifyRequest, reply: FastifyReply) {

    const getBodySchema = z.object({
            commentId : z.string().uuid(),
        })
    
    const {commentId } = getBodySchema.parse(request.params)

    try {
        const prismaLikeRepository = new PrismaLikesRepository()
        const listLikesByCommentUseCase = new ListLikeByCommentIdUseCase(prismaLikeRepository)
        const like = await listLikesByCommentUseCase.execute({commentId})

        return reply.status(200).send({ like })
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: "Like não encontrado" })
        }
    }
}