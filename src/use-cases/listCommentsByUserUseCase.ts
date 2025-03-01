import { CommentsRepository } from "@/repositories/commentsRepository"
import { Comment } from "@prisma/client"


interface ListCommentByUserUseCaseRequest {
    userId: string
}

interface ListCommentByUserUseCaseResponse {
    comment: Comment[]
}

export class ListCommentByUserIdUseCase {
    constructor(private commentsRepository: CommentsRepository) {}

    async execute({userId}: ListCommentByUserUseCaseRequest): Promise<ListCommentByUserUseCaseResponse> {
        if (!this.commentsRepository) {
            throw new Error("Repositório de comentários não instanciado")
        }

        const comment = await this.commentsRepository.listByUser(userId)

        return { comment }
    }
}