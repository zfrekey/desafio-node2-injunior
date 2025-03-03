import { CommentsRepository } from "@/repositories/commentsRepository"
import { Comment } from "@prisma/client"

interface CreateCommentUseCaseRequest {
    content: string
    postId: string
    userId: string
}

interface CreateCommentUseCaseResponse {
    comment: Comment
}

export class CreateCommentUseCase {
    constructor(private commentsRepository: CommentsRepository) {}

    async execute({ content, postId, userId}: CreateCommentUseCaseRequest): Promise<CreateCommentUseCaseResponse> {
        const comment = await this.commentsRepository.create({
            content,
            postId,
            userId,
        })
        return { comment }
    }

}