import z from "zod";

const UserCreateInputSchema = z.object({
	id: z.string().optional(),
	name: z.string(),
	email: z.string(),
	password: z.string(),
	avatar: z.string().nullable(),
});

const UserSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
	passwordHash: z.string(),
	avatar: z.string().nullable(),
});

export type UserCreateInput = z.infer<typeof UserCreateInputSchema>;
export type User = z.infer<typeof UserSchema>;

export interface IUserRepository {
	create(data: UserCreateInput): Promise<User>;
	getByEmail(email: string): Promise<User | null>;
	getById(id: string): Promise<User | null>;
}
