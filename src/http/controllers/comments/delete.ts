import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { ResourceNotFoundError } from "@/use-cases/errors/resourceNotFound"
import { PrismaCommentsRepository } from "@/repositories/prisma/prismaCommentsRepository"
import { DeleteCommentUseCase } from "@/use-cases/deleteCommentUseCase"




export async function deleteComment(request: FastifyRequest, reply: FastifyReply) {
    
    const deleteBodySchema = z.object({
        commentId : z.string().uuid(),
    })

    const {commentId} = deleteBodySchema.parse(request.params)

    try {
        const prismaCommentsRepository = new PrismaCommentsRepository()
        const deleteCommentUseCase = new DeleteCommentUseCase(prismaCommentsRepository)
        const comment = await deleteCommentUseCase.execute({
            commentId
        })

        return reply.status(200).send({ comment })

    } catch (err) {
        if(err instanceof ResourceNotFoundError){
            return reply.status(404).send({ message: "Comentário não encontrado" })
        }
    
    }

}