import { CommentsRepository } from "@/repositories/commentsRepository"
import { Comment } from "@prisma/client"


interface ListCommentUseCaseResponse {
    comment: Comment[]
}

export class ListCommentUseCase {
    constructor(private commentsRepository: CommentsRepository) {}

    async execute(): Promise<ListCommentUseCaseResponse> {
        if (!this.commentsRepository) {
            throw new Error("Repositório de comentários não instanciado")
        }

        const comment = await this.commentsRepository.list()

        return { comment }
    }
}