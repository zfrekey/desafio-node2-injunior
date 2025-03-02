import { Prisma, Like} from "@prisma/client";

export interface LikesRepository {
    create(data: Prisma.LikeCreateInput): Promise<Like>
    getById(likeId: string): Promise<Like | null>
    list(): Promise<Like[]>
    listByPost(postId: string): Promise<Like[]>
    deleteLike(likeId: string): Promise<Like | null>
}