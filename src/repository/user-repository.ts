export type UserCreateInput = {
	name: string;
	email: string;
	password: string;
	avatar?: string;
};

export type User = {
	id: string;
	name: string;
	email: string;
	passwordHash: string;
	avatar?: string;
};

export interface IUserRepository {
	create(data: UserCreateInput): Promise<User>;
	getByEmail(email: string): Promise<User | null>;
}
