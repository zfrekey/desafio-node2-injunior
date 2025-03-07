import { Prisma, Comment} from "@prisma/client";

export interface CommentUpdateInput{
    content?: string
}

export interface CommentsRepository {
    create(data: Prisma.CommentUncheckedCreateInput): Promise<Comment>
    getById(commentId: string):Promise<Comment | null>
    list(): Promise<Comment[]>
    listByUser(userId: string): Promise<Comment[]>
    listByPost(postId: string): Promise<Comment[]>
    update(commentId: string, data: CommentUpdateInput): Promise<Comment | null>
    deleteComment(likeId: string): Promise<Comment | null>
}