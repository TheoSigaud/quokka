import {FastifyInstance} from 'fastify';
import bcrypt from 'bcrypt';
import {UserModel} from "../models/UserModel";
import {z} from "zod";
import {userSchema} from "../schemas/userSchema";

export class AuthService {
    private userModel: UserModel;

    constructor(private fastify: FastifyInstance) {
        this.userModel = new UserModel(fastify);
    }

    async login(email: string, password: string): Promise<{ token: string }> {
        const user: z.infer<typeof userSchema> | null = await this.userModel.getUserByEmail(email);

        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        const token: string = this.fastify.jwt.sign({id: user.id, email: user.email});
        return {token};
    }
}