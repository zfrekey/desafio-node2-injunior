import { prisma } from "@/http/lib/prisma";
import { Comment, Prisma } from "@prisma/client";
import { CommentsRepository, CommentUpdateInput } from "../commentsRepository";


export class PrismaCommentsRepository implements CommentsRepository {

    async create(data: Prisma.CommentCreateInput) {

        const comment = await prisma.comment.create({
            data
        })
        return comment
    }

    async getById(id: string): Promise<Comment | null> {
        const comment = await prisma.comment.findUnique({
            where: {
                id
            }
        })
        return comment
    }
    
    async list(): Promise<Comment[]> {
        const comments = await prisma.comment.findMany()
        return comments
    }

    async listByUser(userId: string): Promise<Comment[]> {
        const comments = await prisma.comment.findMany({
            where: {
                userId
            }
        })
        return comments
    }

    async listByPost(postId: string): Promise<Comment[]> {
        const comments = await prisma.comment.findMany({
            where: {
                postId
            }
        })
        return comments
    }

    async update(commentId: string, data: CommentUpdateInput): Promise<Comment | null> {
        const comment = await prisma.comment.update({
            where: { id : commentId },  
            data: {
                content: data.content,
                created_at: data.created_at
            }
        })
        return comment
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