import fastifyPlugin from 'fastify-plugin';
import fastifyPostgres from '@fastify/postgres';
import {FastifyInstance} from "fastify";

/**
 * @param {FastifyInstance} fastify
 */
async function dbConnector(fastify: FastifyInstance) {
    try {
        await fastify.register(fastifyPostgres, {
            connectionString: process.env.DATABASE_URL
        });
    } catch (err) {
        fastify.log.error(err);
        throw err;
    }
}

export default fastifyPlugin(dbConnector);
