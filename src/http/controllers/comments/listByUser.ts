import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "@/use-cases/errors/resourceNotFound"
import { z } from "zod"
import { PrismaCommentsRepository } from "@/repositories/prisma/prismaCommentsRepository"
import { ListCommentByUserIdUseCase } from "@/use-cases/listCommentsByUserUseCase"

export async function listByUser(request: FastifyRequest, reply: FastifyReply) {

    const getBodySchema = z.object({
            userId : z.string().uuid(),
        })
    
    const {userId} = getBodySchema.parse(request.params)

    try {
        const prismaCommentRepository = new PrismaCommentsRepository()
        const listCommentsByIdUseCase = new ListCommentByUserIdUseCase(prismaCommentRepository)
        const comment = await listCommentsByIdUseCase.execute({userId})

        return reply.status(200).send({ comment })
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: "Comentário não encontrado" })
        }
    }
}