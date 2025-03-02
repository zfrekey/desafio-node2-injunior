import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "@/use-cases/errors/resourceNotFound"
import { PrismaLikesRepository } from "@/repositories/prisma/prismaLikesRepository"
import { ListLikeUseCase } from "@/use-cases/listLikeUseCase"

export async function list(request: FastifyRequest, reply: FastifyReply) {
    try {
        const prismaLikeRepository = new PrismaLikesRepository()
        const listLikesUseCase = new ListLikeUseCase(prismaLikeRepository)
        const like = await listLikesUseCase.execute()

        return reply.status(200).send({ like })
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: "Like não encontrado" })
        }
    }
}