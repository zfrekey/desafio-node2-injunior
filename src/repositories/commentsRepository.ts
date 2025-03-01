import { Prisma, Comment} from "@prisma/client";

export interface CommentsRepository {
    create(data: Prisma.CommentCreateInput): Promise<Comment>
    deleteComment(likeId: string): Promise<Comment | null>
}