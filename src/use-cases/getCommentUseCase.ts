import { CommentsRepository } from "@/repositories/commentsRepository"
import { Comment } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resourceNotFound"


interface GetCommentUseCaseRequest {
    commentId: string
}

interface GetPostUseCaseResponse {
    comment: Comment
}

export class GetCommentUseCase {
    constructor(private commentRepository: CommentsRepository) {}

    async execute({commentId}: GetCommentUseCaseRequest): Promise<GetPostUseCaseResponse> {
        const comment = await this.commentRepository.getById(commentId)

        if(!comment) {
            throw new ResourceNotFoundError()
        }
        return { comment }
    }

}