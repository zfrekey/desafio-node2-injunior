import { Prisma, Like} from "@prisma/client";

export interface LikesRepository {
    create(data: Prisma.LikeCreateInput): Promise<Like>
}