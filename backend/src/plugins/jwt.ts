import fastifyPlugin from 'fastify-plugin';
import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import {fastifyJwt} from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';

async function jwtPlugin(fastify: FastifyInstance) {
    fastify.register(fastifyCookie);
    fastify.register(fastifyJwt, {
        secret: process.env.JWT_SECRET || 'supersecret',
        cookie: {
            cookieName: 'token',
            signed: false
        }
    });

    fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            await request.jwtVerify();
        } catch (err) {
            reply.send(err);
        }
    });
}

export default fastifyPlugin(jwtPlugin);