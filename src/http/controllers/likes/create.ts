
import { PrismaLikesRepository } from "@/repositories/prisma/prismaLikesRepository"
import { CreateLikeUseCase } from "@/use-cases/createLikeUseCase"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function create(request: FastifyRequest, reply: FastifyReply) {
    
    const createBodySchema = z.object({
        created_at: z.coerce.date(),
        postId: z.string(),
        userId: z.string()
    })

    const {created_at, postId, userId} = createBodySchema.parse(request.body)

    try {
        const prismaLikesRepository = new PrismaLikesRepository()
        const createLikeUseCase = new CreateLikeUseCase(prismaLikesRepository)
        await createLikeUseCase.execute({
            created_at,
            postId,
            userId
        })
    } catch (err) {
        throw err
    }
    
    return reply.status(201).send("Like criado com sucesso")
}