import { LikesRepository } from "@/repositories/likesRepository"
import { Like } from "@prisma/client"


interface ListLikeByPostUseCaseRequest {
    postId: string
}

interface ListLikeByPostUseCaseResponse {
    like: Like[]
}

export class ListLikeByPostIdUseCase {
    constructor(private likesRepository: LikesRepository) {}

    async execute({postId}: ListLikeByPostUseCaseRequest): Promise<ListLikeByPostUseCaseResponse> {
        if (!this.likesRepository) {
            throw new Error("Repositório de likes não instanciado")
        }

        const like = await this.likesRepository.listByPost(postId)

        return { like }
    }
}