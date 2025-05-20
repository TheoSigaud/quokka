import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {UserService} from "../services/UserService";
import {userFormSchema, userIdSchema, usersFormSchema} from "../schemas/userSchema";
import {
    userCountSwaggerSchema,
    userCreateSwaggerSchema,
    userDeleteSwaggerSchema,
    userGetSwaggerSchema,
    usersGetSwaggerSchema,
    userUpdateSwaggerSchema
} from "../schemas/Swagger/userSwaggerSchema";
import {z} from "zod";

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 */

async function routes(fastify: FastifyInstance) {
    const userService = new UserService(fastify);

    fastify.get('/', {
        preHandler: [fastify.authenticate],
        schema: usersGetSwaggerSchema,
    }, async (request: FastifyRequest, reply: FastifyReply) => {
        const params = usersFormSchema.parse(request.query);
        return reply.status(200).send(await userService.getAllUsers(params));
    });

    fastify.get('/count', {
        preHandler: [fastify.authenticate],
        schema: userCountSwaggerSchema,
    }, async (request: FastifyRequest, reply: FastifyReply) => {
        const params = usersFormSchema.parse(request.query);
        return reply.status(200).send(await userService.countUsers(params));
    });

    fastify.get('/id/:id', {
        preHandler: [fastify.authenticate],
        schema: userGetSwaggerSchema,
    }, async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const {id} = userIdSchema.parse(request.params);
            const user = await userService.getUserById(id);
            if (user) {
                return reply.status(200).send(user);
            }
            return reply.status(404).send({message: 'Utilisateur non trouvé'});
        } catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({message: "Une erreur s'est produite"});
        }
    });

    fastify.post('/create', {
        preHandler: [fastify.authenticate],
        schema: userCreateSwaggerSchema,
    }, async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const user = userFormSchema.parse(request.body);
            const createdUser = await userService.createUser(user);
            if (createdUser) {
                return reply.status(201).send(createdUser);
            }
            return reply.status(400).send({message: 'Utilisateur non créé'});
        } catch (error) {
            fastify.log.error(error);
            if (error instanceof z.ZodError) {
                return reply.status(400).send({message: 'Données non valides', errors: error.errors});
            }
            return reply.status(500).send({message: "Une erreur s'est produite"});
        }
    });

    fastify.put('/update/:id', {
        preHandler: [fastify.authenticate],
        schema: userUpdateSwaggerSchema,
    }, async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const {id} = userIdSchema.parse(request.params);
            const user = userFormSchema.parse(request.body);
            const updatedUser = await userService.updateUser(id, user);
            if (updatedUser) {
                return reply.status(200).send(updatedUser);
            }
            return reply.status(404).send({message: 'Utilisateur non trouvé'});
        } catch (error) {
            fastify.log.error(error);
            if (error instanceof z.ZodError) {
                return reply.status(400).send({message: 'Données non valides', errors: error.errors});
            }
            return reply.status(500).send({message: "Une erreur s'est produite"});
        }
    });

    fastify.delete('/delete/:id', {
        preHandler: [fastify.authenticate],
        schema: userDeleteSwaggerSchema,
    }, async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const {id} = userIdSchema.parse(request.params);
            if (id === request.user.id) {
                return reply.status(403).send({message: 'Vous ne pouvez pas supprimer votre propre compte'});
            }
            const deletedUser = await userService.deleteUser(id);
            if (deletedUser) {
                return reply.status(200).send({message: 'Utilisateur supprimé'});
            }
            return reply.status(404).send({message: 'Utilisateur non trouvé'});
        } catch (error) {
            fastify.log.error(error);
            return reply.status(500).send({message: "Une erreur s'est produite"});
        }
    });
}

export default routes;