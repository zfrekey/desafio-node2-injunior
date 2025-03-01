import { prisma } from "@/http/lib/prisma";
import { Prisma} from "@prisma/client";
import { LikesRepository } from "../likesRepository";


export class PrismaLikesRepository implements LikesRepository {
        
    async create(data: Prisma.LikeCreateInput) {

        const like = await prisma.like.create({
            data
        })
        return like
    }
    
}