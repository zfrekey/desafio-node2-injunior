import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "@/use-cases/errors/resourceNotFound"
import { z } from "zod"
import { PrismaCommentsRepository } from "@/repositories/prisma/prismaCommentsRepository"
import { ListCommentByPostIdUseCase } from "@/use-cases/listCommentByPostUseCase"


export async function listByPost(request: FastifyRequest, reply: FastifyReply) {

    const getBodySchema = z.object({
            postId : z.string().uuid(),
        })
    
    const {postId} = getBodySchema.parse(request.params)

    try {
        const prismaCommentRepository = new PrismaCommentsRepository()
        const listCommentsByIdUseCase = new ListCommentByPostIdUseCase(prismaCommentRepository)
        const comment = await listCommentsByIdUseCase.execute({postId})

        return reply.status(200).send({ comment })
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: "Comentário não encontrado" })
        }
    }
}