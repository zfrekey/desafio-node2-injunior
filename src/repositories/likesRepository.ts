import { Prisma, Like} from "@prisma/client";

export interface LikesRepository {
    createForPost(data: Prisma.LikeUncheckedCreateInput): Promise<Like>
    createForComment(data: Prisma.LikeUncheckedCreateInput): Promise<Like>
    getById(likeId: string): Promise<Like | null>
    list(): Promise<Like[]>
    listByPost(postId: string): Promise<Like[]>
    listByUser(userId: string): Promise<Like[]>
    listByComment(commentId: string): Promise<Like[]>
    deleteLike(likeId: string): Promise<Like | null>
}