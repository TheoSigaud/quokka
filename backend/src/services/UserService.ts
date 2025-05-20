import {FastifyInstance} from 'fastify';
import {v4 as uuidv4} from 'uuid';
import bcrypt from 'bcrypt';
import {userFormSchema, userResponseSchema, usersFormSchema} from "../schemas/userSchema";
import {z} from "zod";
import {UserModel} from "../models/UserModel";

export class UserService {
    private userModel: UserModel;

    constructor(private fastify: FastifyInstance) {
        this.userModel = new UserModel(fastify);
    }

    async getAllUsers(params: z.infer<typeof usersFormSchema>): Promise<z.infer<typeof userResponseSchema>[]> {
        try {
            const rows: z.infer<typeof userResponseSchema>[] = await this.userModel.getAllUsers(params);
            return z.array(userResponseSchema).parse(rows);
        } catch (error) {
            this.fastify.log.error(error);
            return [];
        }
    }

    async createUser(user: z.infer<typeof userFormSchema>): Promise<z.infer<typeof userResponseSchema>> {
        try {
            const userUuid: string = uuidv4();
            const saltRounds: number = parseInt(process.env.SALT_ROUNDS || "10");
            const hashedPassword: string = await bcrypt.hash(user.password, saltRounds);

            const values: string[] = [userUuid, user.last_name, user.first_name, user.email, hashedPassword, user.birthday];
            const row = await this.userModel.createUser(values);
            return  userResponseSchema.parse(row);
        } catch (error: any) {
            this.fastify.log.error(error);

            if (error.code === '23505') {
                this.fastify.log.warn("Email already used :", user.email);
                const err = new Error("This email is already in use");
                (err as any).statusCode = 409;
                throw err;
            }
            throw error;
        }
    }

    async getUserById(userId: string): Promise<z.infer<typeof userResponseSchema> | null> {
        try {
            const row: z.infer<typeof userResponseSchema> | null = await this.userModel.getUserById(userId);
            if (!row) {
                return null;
            }
            return userResponseSchema.parse(row);
        } catch (error) {
            this.fastify.log.error(error);
            throw error;
        }
    }

    async countUsers(params: z.infer<typeof usersFormSchema>): Promise<number> {
        try {
            return await this.userModel.countUsers(params);
        } catch (error) {
            this.fastify.log.error(error);
            throw error;
        }
    }

    async updateUser(userId: string, user: z.infer<typeof userFormSchema>): Promise<z.infer<typeof userResponseSchema>> {
        try {
            const saltRounds: number = parseInt(process.env.SALT_ROUNDS || "10");
            const hashedPassword: string = await bcrypt.hash(user.password, saltRounds);

            const values: string[] = [user.last_name, user.first_name, user.email, user.birthday, hashedPassword, userId];
            const row: z.infer<typeof userResponseSchema> = await this.userModel.updateUser(values);

            return userResponseSchema.parse(row);
        } catch (error) {
            this.fastify.log.error(error);
            throw error;
        }
    }

    async deleteUser(userId: string): Promise<boolean> {
        try {
            return await this.userModel.deleteUser(userId);
        } catch (error) {
            this.fastify.log.error(error);
            throw error;
        }
    }
}