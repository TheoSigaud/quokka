import {FastifyInstance} from 'fastify';
import {z} from "zod";
import {userResponseSchema, usersFormSchema, userSchema} from "../schemas/userSchema";

export class UserModel {
    constructor(private fastify: FastifyInstance) {
    }

    async getAllUsers(params: z.infer<typeof usersFormSchema>): Promise<z.infer<typeof userResponseSchema>[]> {
        const query = 'SELECT id, last_name, first_name, email, birthday FROM users WHERE email ILIKE $1 LIMIT $2 OFFSET $3';
        const {rows} = await this.fastify.pg.query(query, [`%${params.filter}%`, params.limit, params.offset]);
        return rows;
    }

    async createUser(values: any): Promise<z.infer<typeof userResponseSchema>> {
        const query = `
            INSERT INTO users (id, last_name, first_name, email, password, birthday)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, last_name, first_name, email, birthday;
        `;
        const {rows} = await this.fastify.pg.query(query, values);
        return rows[0];
    }

    async getUserById(userId: string): Promise<z.infer<typeof userResponseSchema> | null> {
        const query = 'SELECT * FROM users WHERE id = $1 LIMIT 1';
        const {rows} = await this.fastify.pg.query(query, [userId]);
        return rows[0];
    }

    async countUsers(params: z.infer<typeof usersFormSchema>): Promise<number> {
        const query = 'SELECT COUNT(*) AS total FROM users WHERE email ILIKE $1 LIMIT $2 OFFSET $3';
        const { rows } = await this.fastify.pg.query(query, [`%${params.filter}%`, params.limit, params.offset]);
        return rows[0].total;
    }

    async getUserByEmail(email: string): Promise<z.infer<typeof userSchema> | null> {
        const query = 'SELECT * FROM users WHERE email = $1 LIMIT 1';
        const {rows} = await this.fastify.pg.query(query, [email]);
        return rows[0];
    }


    async updateUser(values: any): Promise<z.infer<typeof userResponseSchema>> {
        const query = `
            UPDATE users
            SET last_name  = $1,
                first_name = $2,
                email      = $3,
                birthday   = $4,
                password   = $5
            WHERE id = $6
            RETURNING id, last_name, first_name, email, birthday;
        `;
        const {rows} = await this.fastify.pg.query(query, values);
        return rows[0];
    }

    async deleteUser(userId: string): Promise<boolean> {
        const query = 'DELETE FROM users WHERE id = $1 RETURNING id;';
        const {rows} = await this.fastify.pg.query(query, [userId]);
        return rows.length > 0;
    }
}