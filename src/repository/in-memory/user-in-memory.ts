import { randomUUID } from "node:crypto";
import type { User, UserCreateInput } from "@/@types/user";
import type { IUserRepository } from "../user-repository";

export class UserImMemoryRepository implements IUserRepository {
	public items: User[] = [];

	async create(data: UserCreateInput) {
		const user: User = {
			id: data.id ?? randomUUID(),
			name: data.name,
			email: data.email,
			passwordHash: data.password,
			avatar: data.avatar,
		};

		this.items.push(user);

		return user;
	}

	async getByEmail(email: string) {
		const user = this.items.find((user) => user.email === email);

		return user ?? null;
	}
	async getById(id: string) {
		const user = this.items.find((user) => user.id === id);

		return user ?? null;
	}

	async update(id: string, updateData: Partial<User>): Promise<User> {
		const index = this.items.findIndex((user) => user.id === id);

		const oldUser = this.items[index];

		const updatedUser: User = {
			...oldUser,
			...updateData,
			passwordHash: updateData.passwordHash ?? oldUser.passwordHash,
		};

		this.items[index] = updatedUser;

		return updatedUser;
	}
}
