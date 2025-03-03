import { PrismaCommentsRepository } from "@/repositories/prisma/prismaCommentsRepository"
import { ResourceNotFoundError } from "@/use-cases/errors/resourceNotFound"
import { UpdateCommentUseCase } from "@/use-cases/updateCommentUseCase"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function update(request: FastifyRequest, reply: FastifyReply) {
    
    const updateParamsSchema = z.object({
        commentId : z.string().uuid(),
    })

    const updateBodySchema = z.object({
        content: z.string().optional(),
    })

    const {commentId} = updateParamsSchema.parse(request.params)
    const {content} = updateBodySchema.parse(request.body)

    try {
        const prismaCommentsRepository = new PrismaCommentsRepository()
        const updateCommentUseCase = new UpdateCommentUseCase(prismaCommentsRepository)
        const comment = await updateCommentUseCase.execute({
            commentId,
            data: {
                content
            }   
        })

        return reply.status(200).send({ comment })

    } catch (err) {
        if(err instanceof ResourceNotFoundError){
            return reply.status(404).send({ message: "Comentário não encontrado" })
        }
    
    }

}