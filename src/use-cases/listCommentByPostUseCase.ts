import { CommentsRepository } from "@/repositories/commentsRepository"
import { Comment } from "@prisma/client"


interface ListCommentByPostUseCaseRequest {
    postId: string
}

interface ListCommentByPostUseCaseResponse {
    comment: Comment[]
}

export class ListCommentByPostIdUseCase {
    constructor(private commentsRepository: CommentsRepository) {}

    async execute({postId}: ListCommentByPostUseCaseRequest): Promise<ListCommentByPostUseCaseResponse> {
        if (!this.commentsRepository) {
            throw new Error("Repositório de comentários não instanciado")
        }

        const comment = await this.commentsRepository.listByPost(postId)

        return { comment }
    }
}