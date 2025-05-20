import fastifyPlugin from 'fastify-plugin';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import {FastifyInstance} from "fastify";

/**
 * @param {FastifyInstance} fastify
 */

async function swagger(fastify: FastifyInstance) {
    fastify.register(fastifySwagger, {
        openapi: {
            openapi: '3.0.0',
            info: {
                title: 'Quokka swagger',
                description: 'Testing the Quokka Fastify swagger API',
                version: '0.1.0'
            },
            servers: [
                {
                    url: 'http://localhost:3000',
                    description: 'Development server'
                }
            ],
            tags: [
                {name: 'user', description: 'User related end-points'},
                {name: 'auth', description: 'Auth related end-points'},
            ],
            components: {
                securitySchemes: {
                    cookieAuth: {
                        type: 'apiKey',
                        in: 'cookie',
                        name: 'token'
                    }
                }
            },
            security: [
                {
                    cookieAuth: []
                }
            ],
            customOptions: {
                withCredentials: true
            }
        }
    });

    fastify.register(fastifySwaggerUi, {
        routePrefix: '/docs',
        uiConfig: {
            docExpansion: 'list',
            deepLinking: true
        }
    });
}

export default fastifyPlugin(swagger);
