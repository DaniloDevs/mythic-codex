import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { InvalidCredentialsError } from "@/_errors/invalid-credentials";
import { UserImMemoryRepository } from "@/repository/in-memory/user-in-memory";
import { AuthenticatedWithPasswordService } from "@/services/authentication/authenticated-with-password";

describe("Authenticated With Password - Service", () => {
	let userRepository: UserImMemoryRepository;
	let sut: AuthenticatedWithPasswordService;

	beforeEach(async () => {
		userRepository = new UserImMemoryRepository();
		sut = new AuthenticatedWithPasswordService(userRepository);

		await userRepository.create({
			name: "Jhon Doe",
			email: "ex@email.com",
			avatar: null,
			password: await hash("123456", 6),
		});
	});

	it("should be possible to log in with a valid email and password.", async () => {
		const { user } = await sut.execute({
			email: "ex@email.com",
			password: "123456",
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it("should not be possible to log in with a non-existent email address.", async () => {
		await expect(() =>
			sut.execute({
				email: "wrong@email.com",
				password: "123456879",
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});

	it("should not be possible to log in with the wrong password.", async () => {
		await expect(() =>
			sut.execute({
				email: "ex@email.com",
				password: "1",
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});
});
