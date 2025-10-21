import { compare } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { UserAlreadyExistsError } from "@/_errors/user-already-exists";
import { UserImMemoryRepository } from "@/repository/in-memory/user-in-memory";
import { RegisterUserService } from "@/services/register-user";

describe("Create User Service", () => {
	let repository: UserImMemoryRepository;
	let service: RegisterUserService;

	beforeEach(() => {
		repository = new UserImMemoryRepository();
		service = new RegisterUserService(repository);
	});

	it("Deve ser possivel criar um usuario com dados validos", async () => {
		const user = await service.execute({
			name: "Jhon Doe",
			email: "ex@email.com",
			password: "123456879",
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it("Não deve ser possivel criar um usuario com email já utilizado", async () => {
		await service.execute({
			name: "Jhon Doe",
			email: "ex@email.com",
			password: "123456879",
		});

		await expect(
			service.execute({
				name: "Jhon Doe",
				email: "ex@email.com",
				password: "123456879",
			}),
		).rejects.toBeInstanceOf(UserAlreadyExistsError);
	});

	it("Não deve ser possivel criar um usuario com email já utilizado", async () => {
		const user = await service.execute({
			name: "Jhon Doe",
			email: "ex@email.com",
			password: "123456",
		});

		const isPassawordCorrectly = await compare("123456", user.passwordHash);

		expect(isPassawordCorrectly).toBe(true);
	});
});
