import { prisma } from "@/http/lib/prisma";
import { Comment, Prisma } from "@prisma/client";
import { CommentsRepository } from "../commentsRepository";


export class PrismaCommentsRepository implements CommentsRepository {

    async create(data: Prisma.CommentCreateInput) {

        const comment = await prisma.comment.create({
            data
        })
        return comment
    }
    
    async list(): Promise<Comment[]> {
        const comments = await prisma.comment.findMany()
        return comments
    }
    
    async deleteComment(id: string): Promise<Comment | null> {
        const comment = await prisma.comment.delete({
            where: {
                id
            }
        })
        return comment
    }
}