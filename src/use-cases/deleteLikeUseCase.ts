
import { LikesRepository } from "@/repositories/likesRepository"
import { ResourceNotFoundError } from "./errors/resourceNotFound"
import { Like } from "@prisma/client"


interface DeleteLikeUseCaseRequest {
    likeId: string
}

interface DeleteLikeUseCaseResponse {
    like: Like
}

export class DeleteLikeUseCase {
    constructor(private likesRepository: LikesRepository) {}

    async execute({likeId}: DeleteLikeUseCaseRequest): Promise<DeleteLikeUseCaseResponse> {
        const like = await this.likesRepository.deleteLike(likeId)

        if(!like) {
            throw new ResourceNotFoundError()
        }
        return { like }
    }

}