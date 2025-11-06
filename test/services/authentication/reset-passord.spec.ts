import { compare, hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { InvalidTokenError } from "@/_errors/invalid-token";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import { TokensImMemoryRepository } from "@/repository/in-memory/tokens-in-memory";
import { UserImMemoryRepository } from "@/repository/in-memory/user-in-memory";
import { ResetPasswordService } from "@/services/authentication/reset-password";

describe("Reset Password Service", () => {
	let repository: TokensImMemoryRepository;
	let userRepository: UserImMemoryRepository;
	let sut: ResetPasswordService;

	beforeEach(() => {
		repository = new TokensImMemoryRepository();
		userRepository = new UserImMemoryRepository();
		sut = new ResetPasswordService(repository, userRepository);
	});

	it("It should be possible to reset the password using the code.", async () => {
		const user = await userRepository.create({
			id: "user-id",
			name: "Jhon Doe",
			email: "ex@email.com",
			password: await hash("123456", 6),
			avatar: null,
		});

		const token = await repository.createToken({
			type: "RECOVER_PASSWORD",
			userId: user.id,
		});

		await sut.execute({ code: token.code, newPassword: "147258369" });
		const newUser = await userRepository.getById(user.id);

		if (!newUser) throw Error();

		const isPassawordCorrectly = await compare("147258369", newUser.passwordHash);

		expect(isPassawordCorrectly).toBe(true);
	});

	it("It should not be possible to reset the password using an invalid code.", async () => {
		await userRepository.create({
			id: "user-id",
			name: "Jhon Doe",
			email: "ex@email.com",
			password: await hash("123456", 6),
			avatar: null,
		});

		await expect(
			sut.execute({ code: "123456", newPassword: "147258369" }),
		).rejects.toBeInstanceOf(InvalidTokenError);
	});

	it("It should not be possible to reset the password for a user that does not exist.", async () => {
		const token = await repository.createToken({
			type: "RECOVER_PASSWORD",
			userId: "non-exist-user",
		});

		await expect(
			sut.execute({ code: token.code, newPassword: "147258369" }),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
