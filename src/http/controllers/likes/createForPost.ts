
import { PrismaLikesRepository } from "@/repositories/prisma/prismaLikesRepository"
import { CreateLikeForPostUseCase } from "@/use-cases/createLikeForPostUseCase"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function createForPost(request: FastifyRequest, reply: FastifyReply) {
    
    const createBodySchema = z.object({
        created_at: z.coerce.date(),
        postId: z.string(),
    })

    const {created_at, postId} = createBodySchema.parse(request.body)

    try {
        const prismaLikesRepository = new PrismaLikesRepository()
        const createLikeUseCase = new CreateLikeForPostUseCase(prismaLikesRepository)
        await createLikeUseCase.execute({
            created_at,
            postId,
            userId: request.user.sub
        })
    } catch (err) {
        throw err
    }
    
    return reply.status(201).send("Like criado com sucesso")
}