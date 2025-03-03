import { LikesRepository } from "@/repositories/likesRepository"
import { Like } from "@prisma/client"


interface CreateLikeForPostUseCaseRequest {
    created_at: Date
    postId: string
    userId: string
}

interface CreateLikeForPostUseCaseResponse {
    like: Like
}

export class CreateLikeForPostUseCase {
    constructor(private likesRepository: LikesRepository) {}

    async execute({created_at, postId, userId}: CreateLikeForPostUseCaseRequest): Promise<CreateLikeForPostUseCaseResponse> {
        const like = await this.likesRepository.createForPost({
            created_at,
            post: {
                connect: { id: postId}
            },
            user: {
                connect: { id: userId}
            }
        })
        return { like }
    }

}