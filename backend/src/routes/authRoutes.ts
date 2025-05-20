import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import {
    authCheckSwaggerSchema,
    authLoginSwaggerSchema,
    authLogoutSwaggerSchema
} from "../schemas/Swagger/authSwaggerSchema";
import {loginSchema} from "../schemas/authSchema";
import {AuthService} from "../services/AuthService";

async function authRoutes(fastify: FastifyInstance) {
    const authService = new AuthService(fastify);

    fastify.post('/login', {
        schema: authLoginSwaggerSchema
    },async (request: FastifyRequest, reply: FastifyReply) => {
        const {email, password} = loginSchema.parse(request.body);

        try {
            const {token} = await authService.login(email, password);
            reply
                .setCookie('token', token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'strict',
                    path: '/'
                })
                .send({ success: true });
        } catch (error) {
            fastify.log.error(error);
            return reply.status(401).send({message: 'Identifiants invalides'});
        }
    });

    fastify.post('/check', {
        preHandler: [fastify.authenticate],
        schema: authCheckSwaggerSchema,
    },async (request: FastifyRequest, reply: FastifyReply) => {
        return request.user
    });

    fastify.post("/logout", {
        schema: authLogoutSwaggerSchema,
    }, async (request: FastifyRequest, reply: FastifyReply) => {
        reply
            .clearCookie("token", {
                path: "/",
                sameSite: "strict",
                httpOnly: true,
                secure: false,
            })
            .send({ message: "Deconnexion réussie" });
    });
}

export default authRoutes;