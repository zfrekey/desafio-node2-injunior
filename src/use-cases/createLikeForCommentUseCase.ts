import { LikesRepository } from "@/repositories/likesRepository"
import { Like } from "@prisma/client"


interface CreateLikeForCommentUseCaseRequest {
    created_at: Date
    commentId: string
    userId: string
}

interface CreateLikeForCommentUseCaseResponse {
    like: Like
}

export class CreateLikeForCommentUseCase {
    constructor(private likesRepository: LikesRepository) {}

    async execute({created_at, commentId , userId}: CreateLikeForCommentUseCaseRequest): Promise<CreateLikeForCommentUseCaseResponse> {
        const like = await this.likesRepository.createForPost({
            created_at,
            comment: {
                connect: { id: commentId}
            },
            user: {
                connect: { id: userId}
            }
        })
        return { like }
    }

}