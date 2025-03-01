import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "@/use-cases/errors/resourceNotFound"
import { z } from "zod"
import { PrismaPostsRepository } from "@/repositories/prisma/prismaPostsRepository"
import { ListPostByUserIdUseCase } from "@/use-cases/listPostsByUserUseCase"

export async function listByUser(request: FastifyRequest, reply: FastifyReply) {

    const getBodySchema = z.object({
            userId : z.string().uuid(),
        })
    
    const {userId} = getBodySchema.parse(request.params)

    try {
        const prismaCommentRepository = new PrismaPostsRepository()
        const listCommentsByIdUseCase = new ListPostByUserIdUseCase(prismaCommentRepository)
        const comment = await listCommentsByIdUseCase.execute({userId})

        return reply.status(200).send({ post: comment })
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: "Comentário não encontrado" })
        }
    }
}