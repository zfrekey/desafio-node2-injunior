import { LikesRepository } from "@/repositories/likesRepository"
import { Like } from "@prisma/client"


interface CreateLikeForPostUseCaseRequest {
    postId: string
    userId: string
}

interface CreateLikeForPostUseCaseResponse {
    like: Like
}

export class CreateLikeForPostUseCase {
    constructor(private likesRepository: LikesRepository) {}

    async execute({postId, userId}: CreateLikeForPostUseCaseRequest): Promise<CreateLikeForPostUseCaseResponse> {
        const like = await this.likesRepository.createForPost({
            postId,
            userId
        })
        return { like }
    }

}