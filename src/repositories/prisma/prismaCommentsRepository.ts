import { prisma } from "@/http/lib/prisma";
import { Prisma } from "@prisma/client";
import { CommentsRepository } from "../commentsRepository";


export class PrismaCommentsRepository implements CommentsRepository {
    async create(data: Prisma.CommentCreateInput) {

        const comment = await prisma.comment.create({
            data
        })
        return comment
    }

}