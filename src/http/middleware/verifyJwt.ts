import { FastifyReply, FastifyRequest } from "fastify"

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {

    try {
        const headerAuthorization = request.headers.authorization
        if (headerAuthorization === undefined) {
        throw new Error()
        }

        const [, token] = headerAuthorization.split(' ')
        if(token === undefined) {
            throw new Error()
        }

        await request.jwtVerify()
    } catch (error) {
        return reply.status(401).send({ message: "Unauthorized" })
    }
    
}