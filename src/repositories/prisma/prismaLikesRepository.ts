import { prisma } from "@/http/lib/prisma";
import { Like, Prisma} from "@prisma/client";
import { LikesRepository } from "../likesRepository";


export class PrismaLikesRepository implements LikesRepository {
        
    async createForComment(data: Prisma.LikeUncheckedCreateInput) {

        const like = await prisma.like.create({
            data
        })
        return like
    }

    async createForPost(data: Prisma.LikeUncheckedCreateInput) {

        const like = await prisma.like.create({
            data
        })
        return like
    }

    async getById(id: string): Promise<Like | null> {
        const like = await prisma.like.findUnique({
            where: {
                id
            }
        })
        return like
    }

    async list(): Promise<Like[]> {
        const likes = await prisma.like.findMany()
        return likes
    }

    async listByPost(postId: string): Promise<Like[]> {
        const likes = await prisma.like.findMany({
            where: {
                postId
            }
        })
        return likes
    }

    async listByUser(userId: string): Promise<Like[]> {
        const likes = await prisma.like.findMany({
            where: {
                userId
            }
        })
        return likes
    }

    async listByComment(commentId: string): Promise<Like[]> {
        const likes = await prisma.like.findMany({
            where: {
                commentId
            }
        })
        return likes
    }

    async deleteLike(id: string): Promise<Like | null> {
        const like = await prisma.like.delete({
            where: {
                id
            }
        })
        return like
    }
    
}