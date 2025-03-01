import { LikesRepository } from "@/repositories/likesRepository"
import { Like } from "@prisma/client"


interface CreateLikeUseCaseRequest {
    created_at: Date
    postId: string
    userId: string
}

interface CreateLikeUseCaseResponse {
    like: Like
}

export class CreateLikeUseCase {
    constructor(private likesRepository: LikesRepository) {}

    async execute({created_at, postId, userId}: CreateLikeUseCaseRequest): Promise<CreateLikeUseCaseResponse> {
        const like = await this.likesRepository.create({
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