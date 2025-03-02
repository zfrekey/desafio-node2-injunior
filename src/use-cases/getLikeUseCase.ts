import { LikesRepository } from "@/repositories/likesRepository"
import { Like } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resourceNotFound"

interface GetLikeUseCaseRequest {
    likeId: string
}

interface GetLikeUseCaseResponse {
    like: Like
}

export class GetLikeUseCase {
    constructor(private likeRepository: LikesRepository) {}

    async execute({likeId}: GetLikeUseCaseRequest): Promise<GetLikeUseCaseResponse> {
        const like = await this.likeRepository.getById(likeId)

        if(!like) {
            throw new ResourceNotFoundError()
        }
        return { like }
    }
}