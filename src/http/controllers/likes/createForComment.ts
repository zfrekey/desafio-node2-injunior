
import { PrismaLikesRepository } from "@/repositories/prisma/prismaLikesRepository"
import { CreateLikeForCommentUseCase } from "@/use-cases/createLikeForCommentUseCase"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function createForComment(request: FastifyRequest, reply: FastifyReply) {
    
    const createBodySchema = z.object({
        commentId: z.string(),
    })

    const { commentId } = createBodySchema.parse(request.body)

    try {
        const prismaLikesRepository = new PrismaLikesRepository()
        const createLikeUseCase = new CreateLikeForCommentUseCase(prismaLikesRepository)
        await createLikeUseCase.execute({
            commentId,
            userId: request.user.sub
        })
    } catch (err) {
        throw err
    }
    
    return reply.status(201).send("Like criado com sucesso")
}