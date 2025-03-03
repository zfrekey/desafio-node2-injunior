import { LikesRepository } from "@/repositories/likesRepository"
import { Like } from "@prisma/client"


interface ListLikeByCommentUseCaseRequest {
    commentId: string
}

interface ListLikeByCommentUseCaseResponse {
    like: Like[]
}

export class ListLikeByCommentIdUseCase {
    constructor(private likesRepository: LikesRepository) {}

    async execute({commentId }: ListLikeByCommentUseCaseRequest): Promise<ListLikeByCommentUseCaseResponse> {
        if (!this.likesRepository) {
            throw new Error("Repositório de likes não instanciado")
        }

        const like = await this.likesRepository.listByComment(commentId)

        return { like }
    }
}