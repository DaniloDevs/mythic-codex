import { randomUUID } from "node:crypto";
import type {
	IUserRepository,
	User,
	UserCreateInput,
} from "../user-repository";

export class UserImMemoryRepository implements IUserRepository {
	public items: User[] = [];

	async create(data: UserCreateInput) {
		const user: User = {
			id: randomUUID(),
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
}
