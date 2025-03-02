import { LikesRepository } from "@/repositories/likesRepository"
import { Like } from "@prisma/client"


interface ListLikeUseCaseResponse {
    like: Like[]
}

export class ListLikeUseCase {
    constructor(private likesRepository: LikesRepository) {}

    async execute(): Promise<ListLikeUseCaseResponse> {
        if (!this.likesRepository) {
            throw new Error("Repositório de likes não instanciado")
        }

        const like = await this.likesRepository.list()

        return { like }
    }
}