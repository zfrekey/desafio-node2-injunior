import { Like } from "@prisma/client"
import { LikesRepository } from "@/repositories/likesRepository"

interface ListLikeByUserUseCaseRequest {
    userId: string
}

interface ListLikeByUserUseCaseResponse {
    like: Like[]
}

export class ListLikeByUserIdUseCase {
    constructor(private likesRepository: LikesRepository) {}

    async execute({userId}: ListLikeByUserUseCaseRequest): Promise<ListLikeByUserUseCaseResponse> {
        if (!this.likesRepository) {
            throw new Error("Repositório de likes não instanciado")
        }

        const like = await this.likesRepository.listByUser(userId)

        return { like }
    }
}