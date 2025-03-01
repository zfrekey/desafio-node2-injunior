
import { CommentsRepository } from "@/repositories/commentsRepository"
import { ResourceNotFoundError } from "./errors/resourceNotFound"
import { Comment } from "@prisma/client"


interface DeleteCommentUseCaseRequest {
    commentId: string
}

interface DeleteCommentUseCaseResponse {
    comment: Comment
}

export class DeleteCommentUseCase {
    constructor(private commentsRepository: CommentsRepository) {}

    async execute({commentId}: DeleteCommentUseCaseRequest): Promise<DeleteCommentUseCaseResponse> {
        const comment = await this.commentsRepository.deleteComment(commentId)

        if(!comment) {
            throw new ResourceNotFoundError()
        }
        return { comment }
    }

}