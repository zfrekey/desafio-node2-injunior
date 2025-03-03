import { PrismaPostsRepository } from "@/repositories/prisma/prismaPostsRepository"
import { CreatePostUseCase } from "@/use-cases/createPostUseCase"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function create(request: FastifyRequest, reply: FastifyReply) {
    
    const createBodySchema = z.object({
        title: z.string(),
        content: z.string()
    })

    const {title,content} = createBodySchema.parse(request.body)

    try {
        const prismaPostsRepository = new PrismaPostsRepository()
        const createPostUseCase = new CreatePostUseCase(prismaPostsRepository)
        await createPostUseCase.execute({
            title,
            content,
            userId: request.user.sub
        })
    } catch (err) {
        throw err
    }
    
    return reply.status(201).send("Post criado com sucesso")
}