import Fastify from 'fastify';
import swaggerPlugin from './plugins/swagger';
import dbConnector from './plugins/dbConnector';
import initDB from './plugins/initDB';
import userRoutes from './routes/userRoutes';
import jwtPlugin from './plugins/jwt';
import authRoutes from "./routes/authRoutes";
import cors from '@fastify/cors';

/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = Fastify({
    logger: true
});

fastify.register(cors, {
    origin: process.env.CORS_ORIGIN ? JSON.parse(process.env.CORS_ORIGIN) : 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
});

fastify.register(dbConnector);
fastify.register(initDB);
fastify.register(jwtPlugin);
fastify.register(swaggerPlugin);

fastify.register(userRoutes, {prefix: '/users'});
fastify.register(authRoutes, {prefix: '/auth'});

fastify.listen({port: 3000, host: '0.0.0.0'}, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});

export default fastify;