import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "@/use-cases/errors/resourceNotFound"
import { ListCommentUseCase } from "@/use-cases/listaCommentUseCase"
import { PrismaCommentsRepository } from "@/repositories/prisma/prismaCommentsRepository"

export async function list(request: FastifyRequest, reply: FastifyReply) {
    try {
        const prismaCommentRepository = new PrismaCommentsRepository()
        const listCommentsUseCase = new ListCommentUseCase(prismaCommentRepository)
        const comment = await listCommentsUseCase.execute()

        return reply.status(200).send({ comment })
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: "Comment não encontrado" })
        }
    }
}