
import { PrismaCommentsRepository } from "@/repositories/prisma/prismaCommentsRepository"
import { CreateCommentUseCase } from "@/use-cases/createCommentUseCase"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function create(request: FastifyRequest, reply: FastifyReply) {
    
    const createBodySchema = z.object({
        content: z.string(),
        created_at: z.coerce.date(),
        postId: z.string(),
        userId: z.string()
    })

    const {content, created_at, postId, userId} = createBodySchema.parse(request.body)

    try {
        const prismaCommentsRepository = new PrismaCommentsRepository()
        const createCommentUseCase = new CreateCommentUseCase(prismaCommentsRepository)
        await createCommentUseCase.execute({
            content,
            created_at,
            postId,
            userId
        })
    } catch (err) {
        throw err
    }
    
    return reply.status(201).send("Comentário criado com sucesso")
}