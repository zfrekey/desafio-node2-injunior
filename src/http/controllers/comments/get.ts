import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { ResourceNotFoundError } from "@/use-cases/errors/resourceNotFound"
import { PrismaCommentsRepository } from "@/repositories/prisma/prismaCommentsRepository"
import { GetCommentUseCase } from "@/use-cases/getCommentUseCase"

export async function getById(request: FastifyRequest, reply: FastifyReply) {
    
    const getBodySchema = z.object({
        commentId : z.string().uuid(),
    })

    const {commentId} = getBodySchema.parse(request.params)

    try {
        const prismaCommentRepository= new PrismaCommentsRepository()
        const getCommentUseCase = new GetCommentUseCase(prismaCommentRepository)
        const comment = await getCommentUseCase.execute({
            commentId
        })

        return reply.status(200).send({ post: comment })

    } catch (err) {
        if(err instanceof ResourceNotFoundError){
            return reply.status(404).send({ message: "Comentário não encontrado" })
        }
    
    }

}