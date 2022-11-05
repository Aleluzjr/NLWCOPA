import Fastify from 'fastify'
import {PrismaClient} from '@prisma/client'
import cors from '@fastify/cors'

const prisma = new PrismaClient({
    log:['query']
})

async function bootstrap() {
    const fastify = Fastify({
        logger:true
    })

    await fastify.register(cors,{
        origin:true

    })

    // http://localhost:3333
    fastify.get('/pools/count', async () => {

        const findPools = await prisma.pool.findMany({
            where:{
                code:{
                    startsWith: 'A'
                }
            }
        })

        const countPool = await prisma.pool.count()

        return {countPool}
    })

    await fastify.listen({port:3333})
    
}

bootstrap()