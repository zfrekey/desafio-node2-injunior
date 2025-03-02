import { Prisma, Like} from "@prisma/client";

export interface LikesRepository {
    create(data: Prisma.LikeCreateInput): Promise<Like>
    list(): Promise<Like[]>
    deleteLike(likeId: string): Promise<Like | null>
}