import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { InvalidCredentialsError } from "@/_errors/invalid-credentials";
import { UserImMemoryRepository } from "@/repository/in-memory/user-in-memory";
import { AuthenticatedWithPasswordService } from "@/services/authenticated-with-password";

describe("Authenticated with password Service", () => {
	let repository: UserImMemoryRepository;
	let service: AuthenticatedWithPasswordService;

	beforeEach(() => {
		repository = new UserImMemoryRepository();
		service = new AuthenticatedWithPasswordService(repository);
	});

	it("should be possible to log in with a valid email and password.", async () => {
		await repository.create({
			name: "Jhon Doe",
			email: "ex@email.com",
			avatar: null,
			password: await hash("123456", 6),
		});

		const { user } = await service.execute({
			email: "ex@email.com",
			password: "123456",
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it("should not be possible to log in with a non-existent email address.", async () => {
		await repository.create({
			name: "Jhon Doe",
			email: "ex@email.com",
			avatar: null,
			password: await hash("123456", 6),
		});

		await expect(
			service.execute({
				email: "wrong@email.com",
				password: "123456879",
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});

	it("should not be possible to log in with the wrong password.", async () => {
		await repository.create({
			name: "Jhon Doe",
			email: "ex@email.com",
			password: "123456879",
			avatar: null,
		});

		await expect(
			service.execute({
				email: "ex@email.com",
				password: "1",
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});
});
