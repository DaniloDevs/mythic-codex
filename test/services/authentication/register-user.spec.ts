import { compare } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { UserAlreadyExistsError } from "@/_errors/user-already-exists";
import { UserImMemoryRepository } from "@/repository/in-memory/user-in-memory";
import { RegisterUserService } from "@/services/authentication/register-user";

describe("Regsiter User - Service", () => {
	let userRepository: UserImMemoryRepository;
	let sut: RegisterUserService;

	beforeEach(() => {
		userRepository = new UserImMemoryRepository();
		sut = new RegisterUserService(userRepository);
	});

	it("should be possible to register a user with valid data.", async () => {
		const { user } = await sut.execute({
			name: "Jhon Doe",
			email: "ex@email.com",
			password: "123456879",
			avatar: null,
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it("should be possible to register an encrypted password.", async () => {
		const { user } = await sut.execute({
			name: "Jhon Doe",
			email: "ex@email.com",
			password: "123456",
			avatar: null,
		});

		const isPassawordCorrectly = await compare("123456", user.passwordHash);

		expect(isPassawordCorrectly).toBe(true);
	});

	it("should not be possible to register a user with an email address that has already been used.", async () => {
		await sut.execute({
			name: "Jhon Doe",
			email: "ex@email.com",
			password: "123456879",
			avatar: null,
		});

		await expect(() =>
			sut.execute({
				name: "Jhon Doe",
				email: "ex@email.com",
				password: "123456879",
				avatar: null,
			}),
		).rejects.toBeInstanceOf(UserAlreadyExistsError);
	});
});
