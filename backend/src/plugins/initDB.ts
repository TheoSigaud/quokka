import fastifyPlugin from 'fastify-plugin';
import {FastifyInstance} from "fastify";
import {v4 as uuidv4} from "uuid";
import bcrypt from 'bcrypt';

/**
 * @param {FastifyInstance} fastify
 */
async function initDB(fastify: FastifyInstance) {
    try {
        await fastify.pg.query('CREATE TABLE IF NOT EXISTS users (id UUID PRIMARY KEY, last_name TEXT NOT NULL, first_name TEXT NOT NULL, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL, birthday DATE NOT NULL, UNIQUE(email))');

        const userUuid: string = uuidv4();
        const saltRounds: number = parseInt(process.env.SALT_ROUNDS || "10");
        const hashedPassword: string = await bcrypt.hash("quokka", saltRounds);

        await fastify.pg.query(
            `INSERT INTO users (id, last_name, first_name, email, password, birthday)
             VALUES ($1, $2, $3, $4, $5, $6)
                 ON CONFLICT (email) DO NOTHING`,
            [userUuid, 'Admin', 'User', 'admin@example.com', hashedPassword, '1970-01-01']
        );
    } catch (err) {
        fastify.log.error(err);
        throw err;
    }
}

export default fastifyPlugin(initDB);
