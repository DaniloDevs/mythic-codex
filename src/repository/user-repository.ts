import type { User, UserCreateInput } from "@/@types/user";

export interface IUserRepository {
	create(data: UserCreateInput): Promise<User>;
	update(id: string, updateData: Partial<User>): Promise<User>;
	getByEmail(email: string): Promise<User | null>;
	getById(id: string): Promise<User | null>;
}
