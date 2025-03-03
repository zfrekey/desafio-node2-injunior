import { Comment } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resourceNotFound"
import { CommentsRepository } from "@/repositories/commentsRepository"
import { CommentUpdateInput } from "@/repositories/commentsRepository"

interface UpdateCommentUseCaseRequest {
        commentId: string,
        data: CommentUpdateInput
}

interface UpdateCommentUseCaseResponse {
        comment: Comment
}

export class UpdateCommentUseCase {
        constructor(private commentsRepository: CommentsRepository) {}

        async execute({commentId, data}: UpdateCommentUseCaseRequest): Promise<UpdateCommentUseCaseResponse> {
                const comment = await this.commentsRepository.getById(commentId)

                if(!comment) {
                        throw new ResourceNotFoundError()
                }

                const commentUpdated = await this.commentsRepository.update(commentId, data)
                if(!commentUpdated) {
                        throw new ResourceNotFoundError()
                }
                return { comment }
        }
}