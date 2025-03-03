import { LikesRepository } from "@/repositories/likesRepository"
import { Like } from "@prisma/client"


interface CreateLikeForCommentUseCaseRequest {
    commentId: string
    userId: string
}

interface CreateLikeForCommentUseCaseResponse {
    like: Like
}

export class CreateLikeForCommentUseCase {
    constructor(private likesRepository: LikesRepository) {}

    async execute({commentId , userId}: CreateLikeForCommentUseCaseRequest): Promise<CreateLikeForCommentUseCaseResponse> {
        const like = await this.likesRepository.createForPost({
            commentId,
            userId
        })
        return { like }
    }

}