import { compare } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { UserAlreadyExistsError } from "@/_errors/user-already-exists";
import { UserImMemoryRepository } from "@/repository/in-memory/user-in-memory";
import { RegisterUserService } from "@/services/create-user";

describe("Create user Service", () => {
	let repository: UserImMemoryRepository;
	let service: RegisterUserService;

	beforeEach(() => {
		repository = new UserImMemoryRepository();
		service = new RegisterUserService(repository);
	});

	it("should be possible to create a user with valid data.", async () => {
		const { user } = await service.execute({
			name: "Jhon Doe",
			email: "ex@email.com",
			password: "123456879",
			avatar: null,
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it("should not be possible to create a user with an email address that has already been used.", async () => {
		await service.execute({
			name: "Jhon Doe",
			email: "ex@email.com",
			password: "123456879",
			avatar: null,
		});

		await expect(
			service.execute({
				name: "Jhon Doe",
				email: "ex@email.com",
				password: "123456879",
				avatar: null,
			}),
		).rejects.toBeInstanceOf(UserAlreadyExistsError);
	});

	it("should be possible to create an encrypted password.", async () => {
		const { user } = await service.execute({
			name: "Jhon Doe",
			email: "ex@email.com",
			password: "123456",
			avatar: null,
		});

		const isPassawordCorrectly = await compare("123456", user.passwordHash);

		expect(isPassawordCorrectly).toBe(true);
	});
});
