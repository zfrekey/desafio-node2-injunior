import { CommentsRepository } from "@/repositories/commentsRepository"
import { Comment } from "@prisma/client"

interface CreateCommentUseCaseRequest {
    content: string,
    created_at: Date,
    postId: string,
    userId: string
}

interface CreateCommentUseCaseResponse {
    comment: Comment,
}

export class CreateCommentUseCase {
    constructor(private commentsRepository: CommentsRepository) {}

    async execute({ content, created_at, postId, userId}: CreateCommentUseCaseRequest): Promise<CreateCommentUseCaseResponse> {
        const comment = await this.commentsRepository.create({
            content,
            created_at,
            post: {
                connect: { id: postId}
            },
            user: {
                connect: { id: userId}
            }
        })
        return { comment }
    }

}